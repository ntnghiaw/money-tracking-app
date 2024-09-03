const { walletModel } = require('../wallet.model')

const findPlansFilteredByTransaction = async ({ walletId, transaction }) => {
  try {
    const { financial_plans: plans } = await walletModel.findOne({ _id: walletId }).populate({
      path: 'financial_plans',
      match: {
        type: 'budget',
        // categories: [sub_category_id], check newTransaction.category is in categories
        'attributes.categories': transaction.category,
        'attributes.start_date': { $lte: transaction.createdAt },
        'attributes.due_date': { $gte: transaction.createdAt },
      },
    })
    return plans
  } catch (error) {
    throw new InternalServerError('Find plans error')
  }
}

const getAllPlans = async (walletId) => {
  try {
    return await walletModel.findOne({ _id: wallet }).populate('financial_plans').lean()
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Get all plans error')
  }
}

module.exports = {
  findPlansFilteredByTransaction,
  getAllPlans,
}
