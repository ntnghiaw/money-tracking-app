const mongoose = require('mongoose')
const { budgetModel, goalModel, planModel } = require('../financialPlan.model')
const {walletModel} = require('../wallet.model')
const { InternalServerError } = require('../../core/error.response')
const { updateNestedObjectParser } = require('../../utils')

const updateFinancialPlanById = async (planId, attributes, planBody, type) => {
  console.log("🚀 ~ updateFinancialPlanById ~ planBody:", planBody)
  // const foundWallet = await walletModel.findOne({ _id: walletId })
  // if (!foundWallet || !foundWallet.financialPlans.includes(planId)) {
  //   throw new BadRequestError('Invalid wallet')
  // }
  switch (type) {
    case 'budget': {
       await budgetModel.findByIdAndUpdate(planId, { attributes }, { new: true })
    }
    case 'goal': {
       await goalModel.findByIdAndUpdate(planId, { attributes }, { new: true })
    }
   
  }
  return await planModel.findByIdAndUpdate(planId, updateNestedObjectParser(planBody), { new: true })

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
        options: { sort: { createdAt: -1 } },
      })
      .lean()
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Get plan error')
  }
}

const addAmountToGoal = async ({ planId, record }) => {
  console.log("🚀 ~ addAmountToGoal ~ record:", record)
  const foundGoal = await goalModel.findOne({ _id: planId })
  if (!foundGoal) {
    throw new BadRequestError('Invalid Goal')
  }
  if (record.amount < 0) {
    throw new BadRequestError('Invalid record amount')
  }
  try {
    const updatedGoal = await goalModel.findOneAndUpdate(
      { _id: planId },
      {
        $push: {
          records: {
            ...record,
            _id: new mongoose.Types.ObjectId(),
          },
        },
        $inc: { current_amount: record.amount },
      },
      { new: true }
    )
    const updatedPlan = await planModel.findOneAndUpdate(
      {
        _id: updatedGoal._id,
      },
      {
        $push: {
          'attributes.records': {
            ...updatedGoal.records[updatedGoal.records.length - 1],
          },
        },
        $inc: { 'attributes.current_amount': record.amount },
      }
    )

    if (!updatedGoal) {
      throw new BadRequestError('Add record to Goal error')
    }
    if (!updatedPlan) {
      throw new BadRequestError('Add record to Plan error')
    }
    return updatedGoal
  } catch (error) {
    console.log("🚀 ~ addAmountToGoal ~ error:", error)
    throw new InternalServerError('Add record to Goal error')
  }
}

const deleteRecordFromGoal = async ({ planId, recordId }) => {
 
  const foundGoal = await goalModel.findOne({ _id: planId }).lean()
  if (!foundGoal) {
    throw new BadRequestError('Invalid Goal')
  }
  try {
    const updatedRecordsList = foundGoal.records.filter((record) => record._id.toString() !== recordId.toString())
    const {records} = await goalModel.findOne({ _id: planId, 'records._id': recordId }, { 'records.$': 1 }).lean()
    const deletedRecord = await goalModel.findOneAndUpdate(
      { _id: planId },
      {
        $set: { records: updatedRecordsList },
        $inc: { current_amount: -records[0].amount },
      },
      { new: true }
    )
    const updatedPlan = await planModel.findOneAndUpdate(
      {
        _id: planId,
      },
      {
        $set: { 'attributes.records': updatedRecordsList },
        $inc: { 'attributes.current_amount': -records[0].amount},
      }
    )
    if (!deletedRecord) {
      throw new BadRequestError('Delete record from Goal error')
    }
    if (!updatedPlan) {
      throw new BadRequestError('Delete record from Plan error')
    }
    return updatedPlan
  } catch (error) {
    console.log(error)
    throw new InternalServerError('Delete record from Goal error')
  }
}

const updateRecordInGoal = async ({ planId, recordId, record }) => {
  const foundGoal = await goalModel.findOne({ _id: planId }).lean()
  if (!foundGoal) {
    throw new BadRequestError('Invalid Goal')
  }
  try {
    const {records} =  await goalModel.findOne({
      _id: planId,
      'records._id': {$in: [recordId]},
    }
    )
  
    console.log('🚀 ~ updateRecordInGoal ~ records:', records)

  } catch (error) {
    console.log(error)
    throw new InternalServerError('Update record in Goal error')
  }
}

module.exports = {
  updateFinancialPlanById,
  removeOrAddRecordsBudget,
  updateSpentAmountBudget,
  getDetailsPlanById,
  addAmountToGoal,
  deleteRecordFromGoal,
  updateRecordInGoal,
}
