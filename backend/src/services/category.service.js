const { categoryModel } = require('../models/category.model')
const { InternalServerError } = require('../core/error.response')


class CategoryService  {

  static async getAllCategories() {
    try {
     return await categoryModel.find().lean()
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

  static async createSubCategory({userId, categoryId, subCategory}) {
    
  }
}

module.exports = CategoryService

