const { CREATED, SuccessResponse } = require('../core/success.response')
const CategoryService = require('../services/category.service')

class CategoryController {
  createCategory = async (req, res) => {
    new CREATED({
      message: 'Create category success!',
      metadata: await CategoryService.createCategory({
        userId: req.headers['x-client-id'],
        category: req.body,
      }),
    }).send(res)
  }

  updateCategory = async (req, res) => {
    new SuccessResponse({
      message: 'Update category success!',
      metadata: await CategoryService.updateCategory({
        userId: req.headers['x-client-id'],
        categoryId: req.params.categoryId,
        update: req.body,
      }),
    }).send(res)
  }

  deleteCategory = async (req, res) => {
    new SuccessResponse({
      message: 'Delete category success!',
      metadata: await CategoryService.deleteCategory({
        userId: req.headers['x-client-id'],
        categoryId: req.params.categoryId,
      }),
    }).send(res)
  }


  
  getAllCategories = async (req, res) => {
    new SuccessResponse({
      message: 'Get all categories success!',
      metadata: await CategoryService.getAllCategories({
        userId: req.params.userId,
        filter: req.query.filter,
      }),
    }).send(res)
  }
  
  createSubCategory = async (req, res) => {
    new CREATED({
      message: 'Create sub-category success!',
      metadata: await CategoryService.createSubCategory(req.body),
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
