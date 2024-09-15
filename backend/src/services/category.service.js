const { categoryModel, subCategoryModel } = require('../models/category.model')
const { InternalServerError, NotFoundError } = require('../core/error.response')
const UserService = require('./user.service')
const { getInfoData } = require('../utils')
const userModel = require('../models/user.model')
const { Types } = require('mongoose')

class CategoryService {
  static async getAllCategories({ userId, filter }) {
    // filter = ['income', 'expense']
    try {
      if (userId) {
        const { categories } = await userModel
          .findOne({ _id: userId })
          .populate({
            path: 'categories',
            match: {
              type: { $in: !!filter ? filter : ['income', 'expense'] },
            },
          })
          .lean()

        if (!categories.length) {
          throw new NotFoundError('Not found')
        }
        return categories
      }
      const categories = await categoryModel
        .find({
          type: { $in: !!filter ? filter : ['income', 'expense'] },
        })
        .lean()

      return categories
    } catch (error) {
      throw new InternalServerError('Get all categories error')
    }
  }

  static async createCategory({ userId, category }) {
    
    try {
      const {categories} = await userModel.findOne({ _id: userId }).populate({
        path: 'categories',
        match: { name: category.name },
      })
      if (categories.length !== 0) {
        throw new InternalServerError('Category already exists')
      }
      const newCategory = await categoryModel.create(category)
      if (!newCategory) {
        throw new InternalServerError('Create new category error')
      }
      await userModel.findOneAndUpdate({ _id: userId }, { $push: { categories: newCategory._id } })
      return newCategory
    } catch (error) {
      console.log("🚀 ~ CategoryService ~ createCategory ~ error:", error)
      throw new InternalServerError('Create new category error')
    }
  }

  static async updateCategory({ userId, categoryId, update }) {

    try {
      const foundUser = await userModel
        .findOne({ _id: userId })
        
      // if (
      //   !foundUser ||
      //   !foundUser.categories.includes(Types.ObjectId.createFromHexString(categoryId))
      // ) {
      //   throw new InternalServerError('Category not found')
      // }
      const updatedCategory = await categoryModel.findOneAndUpdate(
        { _id: categoryId },
        { $set: update },
        { new: true, upsert: true }
      )
      return updatedCategory
    } catch (error) {
      console.log("🚀 ~ CategoryService ~ updateCategory ~ error:", error)
      
      throw new InternalServerError('Update category error')
    }
  }

  static async deleteCategory({ userId, categoryId }) {
    try {
      const foundUser = await userModel.findOne({ _id: userId }).populate({
        path: 'categories'})
      if (!foundUser || !foundUser.categories.toObject().includes(categoryId)) {
        throw new InternalServerError('Category not found')
      }
      const deletedCategory = await categoryModel.findByIdAndDelete(categoryId )
      if (!deletedCategory) {
        throw new InternalServerError('Delete category error')
      }
      await userModel.findOneAndUpdate({ _id: userId }, { $pull: { categories: categoryId } })
      return deletedCategory
    } catch (error) {
      throw new InternalServerError('Delete category error')
    }
  }


  //   static async createNewSubCategory({ userId, categoryId, subCategory }) {
  //     const foundUser = await UserService.findById(userId)
  //     if (!foundUser || !foundUser.categories.includes(categoryId)) {
  //       throw new NotFoundError('Category not found')
  //     }
  //     const newSubCategory = await subCategoryModel.create(subCategory)
  //     if (!newSubCategory) {
  //       throw new InternalServerError('Create sub-category error')
  //     }
  //     try {
  //       const updatedCategory = await categoryModel.findOneAndUpdate(
  //         { _id: categoryId },
  //         { $push: { sub_categories: newSubCategory._id } },
  //         { new: true }
  //       )
  //       return newSubCategory
  //     } catch (error) {
  //       console.log(error)
  //       await subCategoryModel.deleteOne({ _id: newSubCategory._id })
  //       throw new InternalServerError('Create sub-category error')
  //     }
  //   }

  //   static async updateSubCategory({ userId, categoryId, subCategoryId, update }) {
  //     const foundUser = await UserService.findById(userId)
  //     if (!foundUser || !foundUser.categories.includes(categoryId)) {
  //       throw new NotFoundError('Category not found')
  //     }

  //     try {
  //       const foundSubCategory = await categoryModel.findOne({
  //         _id: categoryId,
  //         'sub_categories._id': subCategoryId,
  //       })
  //       if (!foundSubCategory) {
  //         throw new NotFoundError('Sub-category not found')
  //       }
  //       const updatedSubCategory = await subCategoryModel.findOneAndUpdate(
  //         { _id: subCategoryId },
  //         update,
  //         { new: true }
  //       )
  //       return updatedSubCategory
  //     } catch (error) {
  //       console.log(error)
  //       throw new InternalServerError('Update sub-category error')
  //     }
  //   }

  //   static async deleteSubCategory({ userId, categoryId, subCategoryId }) {
  //     const foundUser = await UserService.findById(userId)
  //     if (!foundUser || !foundUser.categories.includes(categoryId)) {
  //       throw new NotFoundError('Category not found')
  //     }

  //     const foundSubCategory = await categoryModel.findOne({
  //       _id: categoryId,
  //       'sub_categories._id': subCategoryId,
  //     })
  //     if (!foundSubCategory) {
  //       throw new NotFoundError('Sub-category not found')
  //     }

  //     const deletedSubCategory = await subCategoryModel.findOneAndDelete({ _id: subCategoryId })
  //     if (!deletedSubCategory) {
  //       throw new InternalServerError('Delete sub-category error')
  //     }
  //     try {
  //       await categoryModel.findOneAndUpdate(
  //         {
  //           _id: categoryId,
  //         },
  //         {
  //           $pull: { sub_categories: subCategoryId },
  //         }
  //       )
  //       return deletedSubCategory
  //     } catch (error) {
  //       console.log(error)
  //       throw new InternalServerError('Delete sub-category error')
  //     }
  //   }
}

module.exports = CategoryService
