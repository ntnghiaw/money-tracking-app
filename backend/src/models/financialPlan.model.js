const { model, Schema } = require('mongoose')
const { CategorySchema } = require('./category.model')
const { min } = require('lodash')



const DOCUMENT_NAME = 'FinancialPlan'
const COLLECTION_NAME = 'financialPlans'

const budgetSchema = new Schema(
  {
    target_amount: { //input
      type: Number,
      min: 0,
      required: true,
    },
    spent_amount: {
      type: Number,
      min: 0,
      default: 0,
    },
    categories: 
      [{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
      },
    ],
    start_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    due_date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    records: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
  },
  {
    timeseries: true,
    collection: 'budgets',
  }
)

const goalSchema = new Schema(
  {
    target_amount: {
      type: Number,
      required: true,
    },
    desired_date: {
      type: Date,
      required: true,
    },
    current_amount: {
      type: Number,
      default: 0,
    },
    records: [
      {
        amount: {
          type: Number,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        description: {
          type: String,
          maxLength: 255,
        }
      },
    ],
  },
  {
    timeseries: true,
    collection: 'goals',
  }
)

const financialPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      maxLength: 255,
    },
    type: {
      type: String,
      enum: ['budget', 'goal'],
      required: true,
    },
    attributes: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
)

module.exports = {
  planModel: model(DOCUMENT_NAME, financialPlanSchema),
  budgetModel: model('Budget', budgetSchema),
  goalModel: model('Goal', goalSchema),
}
