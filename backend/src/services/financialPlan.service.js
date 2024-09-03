const { planModel, budgetModel, goalModel } = require('../models/financialPlan.model')
const { BadRequestError, InternalServerError } = require('../core/error.response')
const { startSession } = require('mongoose')
const { subCategoryModel, categoryModel } = require('../models/category.model')
const { walletModel } = require('../models/wallet.model')
const { getInfoData } = require('../utils')
const {
  updateFinancialPlanById,
  getDetailsPlanById,
} = require('../models/repositories/financialPlan.repo')

class FinancialPlanFactory {
  /*
     type: 'budget' | 'goal'
     payload
   */
  static financialPlanRegistry = {} // key-class

  static registerFinancialPlanType(type, classRef) {
    FinancialPlanFactory.financialPlanRegistry[type] = classRef
  }

  static async createFinancialPlan({ type, payload, walletId }) {
    const planClass = FinancialPlanFactory.financialPlanRegistry[type]
    if (!planClass) {
      throw new BadRequestError(`Invalid Plan Type  ${type}`)
    }
    return new planClass(walletId, payload).createFinancialPlan()
  }

  static async updateFinancialPlan({ type, bodyUpdate, walletId, planId }) {
    const planClass = FinancialPlanFactory.financialPlanRegistry[type]
    if (!planClass) {
      throw new BadRequestError(`Invalid Plan Type  ${type}`)
    }
    return new planClass(walletId, bodyUpdate).updateFinancialPlan(planId)
  }

  static async deleteFinancialPlan({ walletId, planId }) {
    const planClass = FinancialPlanFactory.financialPlanRegistry[type]
    if (!planClass) {
      throw new BadRequestError(`Invalid Plan Type  ${type}`)
    }
    return new planClass(walletId).deleteFinancialPlan(planId)
  }

  static async getFinancialPlanById({ walletId, planId }) {
    const planClass = FinancialPlanFactory.financialPlanRegistry[type]
    if (!planClass) {
      throw new BadRequestError(`Invalid Plan Type  ${type}`)
    }
    return new planClass(walletId).getFinancialPlanById(planId)
  }

  static async getAllFinancialPlans({ type, walletId }) {
    const planClass = FinancialPlanFactory.financialPlanRegistry[type]
    if (!planClass) {
      throw new BadRequestError(`Invalid Plan Type  ${type}`)
    }
    return new planClass(walletId).getAllFinancialPlans(planId)
  }
}

class FinancialPlan {
  constructor(walletId, { name = '', description = '', type = 'budget', attributes = [] }) {
    this.name = name
    this.description = description
    this.type = type
    this.attributes = attributes
    this.walletId = walletId
  }

  async createFinancialPlan({ _id, attributes }) {
    try {
      const newPlan = await planModel.create({ ...this, _id, attributes })
      await walletModel.findOneAndUpdate(
        { _id: this.walletId },
        { $push: { financial_plans: newPlan._id } }
      )
      return newPlan
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Create Plan error')
    }
  }

  async updateFinancialPlan({ _id, attributes }) {
    return await updateFinancialPlanById(_id, { ...this, attributes }, { new: true })
  }

  static async deleteFinancialPlan(walletId, planId) {
    try {
      await planModel.deleteOne({ _id: planId })
      await walletModel.findOneAndUpdate({ _id: walletId }, { $pull: { financial_plans: planId } })
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Delete Plan error')
    }
  }

  static async getFinancialPlanById(walletId, planId) {
    try {
      const foundWallet = await walletModel.findOne({ _id: walletId }).lean()
      if (!foundWallet || !foundWallet.financial_plans.includes(planId)) {
        throw new BadRequestError('Invalid Plan')
      }
      return await getDetailsPlanById(planId)
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Get Plan error')
    }
  }

  static async getAllFinancialPlans(walletId) {
    try {
      const foundWallet = await walletModel.findOne({ _id: walletId }).lean()
      if (!foundWallet) {
        throw new BadRequestError('Invalid Wallet')
      }
      return await getAllPlans(walletId)
    } catch (error) {}
  }
}

// define sub-class for budget

class Budget extends FinancialPlan {
  async createFinancialPlan() {
    try {
      const { categories, start_date, due_date } = this.attributes
      let records = []
      let spentAmount = 0
      // filter records by categories
      for (const subCategory of categories) {
        const { transactions } = await walletModel.findOne({ _id: this.walletId }).populate({
          path: 'transactions',
          match: {
            category: subCategory, // id of subcategory
            createdAt: {
              $gte: start_date,
              $lt: due_date,
            },
          },
        })

        // compute spent amount from records filtered by categories, start_date, due_date
        transactions.forEach((transaction) => records.push(transaction._id))
        spentAmount += transactions.reduce((pre, cur) => pre + cur.amount, 0)
      }

      // create new budget with spent amount and records
      const newBudget = await budgetModel.create({
        ...this.attributes,
        records,
        spent_amount: spentAmount,
      })

      if (!newBudget) {
        throw new BadRequestError('Create new Budget error')
      }

      // create new plan with budget attributes
      const newPlan = await super.createFinancialPlan({
        _id: newBudget._id,
        attributes: getInfoData({
          object: newBudget,
          fields: [
            'target_amount',
            'spent_amount',
            'start_date',
            'due_date',
            'categories',
            'records',
          ],
        }),
      })
      // when create new plan failed, we should delete the created budget?
      if (!newPlan) {
        throw new BadRequestError('Create new Plan error')
      }
      return newPlan
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Create new Budget error')
    }
  }

  async updateFinancialPlan(planId) {
    const foundPlan = await planModel.findOne({ _id: planId })
    if (!foundPlan) {
      throw new BadRequestError('Invalid Plan')
    }
    const categories = this.attributes?.categories || foundPlan.categories // if categories is not updated, use the old one
    const start_date = this.attributes?.start_date || foundPlan.start_date // if start_date is not updated, use the old one
    const due_date = this.attributes?.due_date || foundPlan.due_date // if due_date is not updated, use the old one
    try {
      let records = []
      let spentAmount = 0
      // filter records by categories
      for (const category of categories) {
        const { transactions } = await walletModel.findOne({ _id: this.walletId }).populate({
          path: 'transactions',
          match: {
            category: category, // id of subcategory
            createdAt: {
              $gte: start_date,
              $lt: due_date,
            },
          },
        })

        // compute spent amount from records filtered by categories, start_date, due_date
        transactions.forEach((transaction) => records.push(transaction._id))
        spentAmount += transactions.reduce((pre, cur) => pre + cur.amount, 0)
      }

      // create new budget with spent amount and records
      const updatedBudget = await budgetModel.findOneAndUpdate(
        { _id: planId },
        {
          ...this.attributes,
          records,
          spent_amount: spentAmount,
        },
        { new: true }
      )

      if (!updatedBudget) {
        throw new BadRequestError('Update Budget error')
      }

      // create new plan with budget attributes
      const updatedPlan = await super.updateFinancialPlan({
        _id: updatedBudget._id,
        attributes: getInfoData({
          object: updatedBudget,
          fields: [
            'target_amount',
            'spent_amount',
            'start_date',
            'due_date',
            'categories',
            'records',
          ],
        }),
      })

      // when create new plan failed, we should delete the created budget?
      if (!updatedPlan) {
        throw new BadRequestError('Create new Plan error')
      }
      return updatedPlan
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Create new Budget error')
    }
  }

  static async deleteFinancialPlan(walletId, planId) {
    console.log(planId)

    try {
      const deletedBudget = await budgetModel.deleteOne({ _id: planId })
      if (!deletedBudget) {
        throw new InternalServerError('Delete Budget error')
      }
      const deletedPlan = await super.deleteFinancialPlan(walletId, planId)
      return deletedPlan
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Delete Budget error 2')
    }
  }
}
/* 
  1. category + start_date + due_date -> records -> spent amount
  2. target amount
*/

// define sub-class for goal
class Goal extends FinancialPlan {
  async createFinancialPlan() {
    try {
      const newGoal = await goalModel.create(this.attributes)
      if (!newGoal) {
        throw new BadRequestError('Create new Goal error')
      }

      const newPlan = await super.createFinancialPlan(newGoal._id)
      if (!newPlan) {
        throw new BadRequestError('Create new Plan error')
      }
      return newPlan
    } catch (error) {
      throw new InternalServerError('Create new Goal error')
    }
  }
}

// register financial plan type
FinancialPlanFactory.registerFinancialPlanType('budget', Budget)
FinancialPlanFactory.registerFinancialPlanType('goal', Goal)

module.exports = FinancialPlanFactory
