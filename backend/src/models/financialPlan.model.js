const { model, Schema } = require('mongoose')
const { CategorySchema } = require('./category.model')



const DOCUMENT_NAME = 'FinancialPlan'
const COLLECTION_NAME = 'financial_plans'

const budgetSchema = new Schema(
  {
    spentAmount: {
      type: Number,
      default: 0,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
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
    targetAmount: {
      type: Number,
      required: true,
    },
    desiredDate: {
      type: Date,
      required: true,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
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
    records: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
    targetAmount: {
      type: Number,
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
  plan: model(DOCUMENT_NAME, financialPlanSchema),
  budget: model('Budget', budgetSchema),
  goal: model('Goal', goalSchema),
}
