const { budgetModel, goalModel, planModel } = require('../financialPlan.model')
const walletModel = require('../wallet.model')

const updateFinancialPlanById = async ({ walletId, planId, bodyUpdate, model, isNew = true }) => {
  const foundWallet = await walletModel.findOne({ _id: walletId })
  if (!foundWallet || !foundWallet.financialPlans.includes(planId)) {
    throw new BadRequestError('Invalid wallet')
  }
  const updateModels = {
    budget: async (planId, bodyUpdate) =>
      await budgetModel.findByIdAndUpdate(planId, { bodyUpdate }, { new: true }),
    goal: async (planId, bodyUpdate) =>
      goalModel.findByIdAndUpdate(planId, { bodyUpdate }, { new: true }),
    plan: async (planId, bodyUpdate) =>
      await planModel.findByIdAndUpdate(planId, { bodyUpdate }, { new: true }),
  }

  return updateModels[model](planId, bodyUpdate)
}

const removeOrAddRecordsBudget = async ({ planId, transactionId, amount, type = 'delete' }) => {
  try {
    if (type === 'delete') {
      await budgetModel.findByIdAndUpdate(planId, {
        $pull: { records: transactionId },
        $inc: { spent_amount: -amount },
      })
      return (updatedPlan = await planModel.findByIdAndUpdate(
        planId,
        {
          $pull: { 'attributes.records': transactionId },
          $inc: { 'attributes.spent_amount': -amount },
        },
        { new: true }
      ))
    } else {
      await budgetModel.findByIdAndUpdate(planId, {
        $push: { records: transactionId },
        $inc: { spent_amount: amount },
      })
      return (updatedPlan = await planModel.findByIdAndUpdate(
        planId,
        {
          $push: { 'attributes.records': transactionId },
          $inc: { 'attributes.spent_amount': amount },
        },
        { new: true }
      ))
    }
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Update financial plan error')
  }
}

const updateSpentAmountBudget = async ({ planId, amount }) => {
  try {
    await budgetModel.findByIdAndUpdate(
      planId,
      {
        $inc: { spent_amount: amount },
      },
      { new: true }
    )
    return await planModel.findByIdAndUpdate(
      planId,
      {
        $inc: { 'attributes.spent_amount': amount },
      },
      { new: true }
    )
  } catch (error) {}
}

const getDetailsPlanById = async (planId) => {
  try {
    return await planModel
      .findOne({ _id: planId })
      .populate({
        path: 'attributes.categories',
      })
      .populate({
        path: 'attributes.records',
      }).lean()
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Get plan error')
  }
}

module.exports = {
  updateFinancialPlanById,
  removeOrAddRecordsBudget,
  updateSpentAmountBudget,
  getDetailsPlanById,
}
