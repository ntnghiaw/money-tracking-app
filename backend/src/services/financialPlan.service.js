const { planModel, budgetModel, goalModel } = require('../models/financialPlan.model')
const { BadRequestError, InternalServerError } = require('../core/error.response')
const { startSession } = require('mongoose')

class FinancialPlanFactory {
  /*
     type: 'budget' | 'goal'
     payload
   */
  static async createFinancialPlan(type, payload) {
    switch (type) {
      case 'budget':
        return await new Budget(payload).createFinancialPlan()
      case 'goal':
        return await new Goal(payload).createFinancialPlan()
      default:
        throw new BadRequestError(`Invalid Plan Type  ${type}`)
    }
  }
}

class FinancialPlan {
  constructor({ name, description, type, records, targetAmount, attributes }) {
    this.name = name
    this.description = description
    this.type = type
    this.records = records
    this.targetAmount = targetAmount
    this.attributes = attributes
  }

  async createFinancialPlan(planId) {
    return await FinancialPlan.create({ ...this, _id: planId })
  }
}

// define sub-class for budget
class Budget extends FinancialPlan {
  async createFinancialPlan() {
    const session = await startSession()
    try {
      session.startTransaction()
      const newBudget = await budgetModel.create(this.attributes)
      if (!newBudget) {
        throw new BadRequestError('Create new Budget error')
      }
      const newPlan = await super.createFinancialPlan(newBudget._id)
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
}

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

module.exports = FinancialPlanFactory
