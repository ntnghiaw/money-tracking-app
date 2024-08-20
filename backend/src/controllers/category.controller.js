const { CREATED, SuccessResponse } = require('../core/success.response')
const CategoryService = require('../services/category.service')

class CategoryController {
  createCategory = async (req, res) => {
    new CREATED({
      message: 'Create category success!',
      metadata: await CategoryService.createCategory(req.body),
    }).send(res)
  }

  createSubCategory = async (req, res) => {
    new CREATED({
      message: 'Create sub-category success!',
      metadata: await CategoryService.createSubCategory(req.body),
    }).send(res)
  }

  getAllCategories = async (req, res) => {
    new SuccessResponse({
      message: 'Get all categories success!',
      metadata: await CategoryService.getAllCategories(),
    }).send(res)
  }

  createNewSubCategory = async (req, res) => {
    new CREATED({
      message: 'Create new sub-category success!',
      metadata: await CategoryService.createNewSubCategory({
        userId: req.headers['x-client-id'],
        categoryId: req.params.categoryId,
        subCategory: req.body,
      }),
    }).send(res)
  }
}

module.exports = new CategoryController()
