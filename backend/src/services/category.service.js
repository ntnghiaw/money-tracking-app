const { categoryModel, subCategoryModel } = require('../models/category.model')
const { InternalServerError, NotFoundError } = require('../core/error.response')
const UserService = require('./user.service')
const { getInfoData } = require('../utils')

class CategoryService {
  static async getAllCategories() {
    try {
      const categories =  await categoryModel.find().populate('sub_categories').lean()
      console.log(categories)
      return categories.map(category => {
      return getInfoData({object: category, fields:['_id', 'icon', 'name', 'type', 'sub_categories']})
      })
    } catch (error) {
      throw new InternalServerError('Get all categories error')
    }
  }

  static async createCategory(category) {
    try {
      return await categoryModel.create(category)
    } catch (error) {
      throw new InternalServerError('Create new category error')
    }
  }

  static async createNewSubCategory({ userId, categoryId, subCategory }) {
    const foundUser = await UserService.findById(userId)
    if (!foundUser || !foundUser.categories.includes(categoryId)) {
      throw new NotFoundError('Category not found')
    }
    const newSubCategory = await subCategoryModel.create(subCategory)
    if (!newSubCategory) {
      throw new InternalServerError('Create sub-category error')
    }
    try {
      const updatedCategory = await categoryModel.findOneAndUpdate(
        { _id: categoryId },
        { $push: { sub_categories: newSubCategory._id } },
        { new: true }
      )
      return newSubCategory
    } catch (error) {
      console.log(error)
      await subCategoryModel.deleteOne({ _id: newSubCategory._id })
      throw new InternalServerError('Create sub-category error')
    }
  }

  static async updateSubCategory({ userId, categoryId, subCategoryId, update }) {
    const foundUser = await UserService.findById(userId)
    if (!foundUser || !foundUser.categories.includes(categoryId)) {
      throw new NotFoundError('Category not found')
    }

    try {
      const foundSubCategory = await categoryModel.findOne({
        _id: categoryId,
        'sub_categories._id': subCategoryId,
      })
      if (!foundSubCategory) {
        throw new NotFoundError('Sub-category not found')
      }
      const updatedSubCategory = await subCategoryModel.findOneAndUpdate(
        { _id: subCategoryId },
        update,
        { new: true }
      )
      return updatedSubCategory
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Update sub-category error')
    }
  }

  static async deleteSubCategory({ userId, categoryId, subCategoryId }) {
    const foundUser = await UserService.findById(userId)
    if (!foundUser || !foundUser.categories.includes(categoryId)) {
      throw new NotFoundError('Category not found')
    }

    const foundSubCategory = await categoryModel.findOne({
      _id: categoryId,
      'sub_categories._id': subCategoryId,
    })
    if (!foundSubCategory) {
      throw new NotFoundError('Sub-category not found')
    }

    const deletedSubCategory = await subCategoryModel.findOneAndDelete({ _id: subCategoryId })
    if (!deletedSubCategory) {
      throw new InternalServerError('Delete sub-category error')
    }
    try {
      await categoryModel.findOneAndUpdate(
        {
          _id: categoryId,
        },
        {
          $pull: { sub_categories: subCategoryId },
        }
      )
      return deletedSubCategory
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Delete sub-category error')
    }
  }
}

module.exports = CategoryService
