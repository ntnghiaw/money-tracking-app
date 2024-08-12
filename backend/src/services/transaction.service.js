const transactionModel = require('../models/transaction.model')
const { categoryModel } = require('../models/category.model')
const { getStartDate } = require('../utils/date')
const UserServices = require('./user.service')
const {walletModel} = require('../models/wallet.model')
const {
  BadRequestError,
  InternalServerError,
} = require('../core/error.response')
const { Types } = require('mongoose')

class TransactionService {
  static getAllTransactions = async ({
    walletId,
    options = {
      limit: 20,
      offset: '',
      sort: 'desc',
      filter: 'daily',
    },
  }) => {
    const foundWallet = await walletModel.findOne({ _id: walletId })
    if (!foundWallet) {
      throw new BadRequestError('Invalid wallet')
    }
    try {
      const { transactions } = await walletModel
        .findOne({ _id: walletId })
        .populate({
          path: 'transactions',
          match: {
            _id: !!options.offset && { $gt: options.offset },
            createdAt: {
              $gte: getStartDate(options.filter),
              $lt: new Date(new Date().getTime() + 60000*420) // timezone GMT +7
            },
          },
          options: {
            limit: options.limit,
            sort: { createdAt: options.sort === 'desc' ? -1 : 1 },
          },
        })

      console.log(transactions)

      return transactions
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Get all transactions error')
    }
  }

  static getTransactionById = async ({ walletId, transactionId }) => {
    const wallet = await walletModel.findOne({ _id: walletId })
    if (!wallet || !wallet.transactions.includes(transactionId)) {
      throw new BadRequestError('Invalid request')
    }
    try {
      const transaction = await transactionModel.findOne({ _id: transactionId })
      return transaction
    } catch (error) {
      throw new InternalServerError('Get transaction error')
    }
  }

  static createTransaction = async ({ userId, walletId, transaction }) => {
    // check valid category
    const foundCategory = await categoryModel
      .findOne({ _id: transaction.category._id })
      .lean()

    if (!foundCategory) {
      throw new BadRequestError('Invalid request')
    }
    const newTransaction = await transactionModel.create(transaction)
    if (!newTransaction) {
      throw new BadRequestError('Cannot create transaction')
    }
    try {
      const foundUser = await UserServices.findById(userId)
      if (!foundUser || !foundUser.wallets.includes(walletId)) {
        throw new BadRequestError('Invalid user or wallet')
      }

      // update wallet
      await walletModel.findOneAndUpdate(
        { _id: walletId },
        {
          $push: { transactions: newTransaction._id },
          $inc: {
            walletBalance:
              newTransaction.amount *
              (newTransaction.type === 'expense' ? -1 : 1),
          },
        },
        { new: true }
      )
      return newTransaction
    } catch (error) {
      // Rollback
      console.log(error)
      await transactionModel.deleteOne({ _id: newTransaction._id })
      throw new InternalServerError('Cannot create transaction')
    }
  }

  static updateTransaction = async ({
    walletId,
    transactionId,
    transaction,
  }) => {
    const wallet = await walletModel.findOne({ _id: walletId })
    if (!wallet) {
      throw new BadRequestError('Invalid request')
    }

    try {
      const filter = { _id: transactionId },
        update = transaction,
        options = { new: true, insert: true }

      const foundTransaction = await transactionModel.findOne(filter)

      const { amount, type } = foundTransaction

      const updatedTransaction = await transactionModel.findOneAndUpdate(
        filter,
        update,
        options
      )
      const newAmount =
        (updatedTransaction.type === 'expense'
          ? -updatedTransaction.amount
          : updatedTransaction.amount) +
        (foundTransaction.type === 'expense' ? amount : -amount)
      await walletModel.findOneAndUpdate(
        {
          _id: walletId,
        },
        {
          $inc: { walletBalance: newAmount },
        }
      )
      return updatedTransaction
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Update transaction error')
    }
  }

  static deleteTransactionById = async ({ walletId, transactionId }) => {
    const wallet = await walletModel.findOne({ _id: walletId })
    if (!wallet || !wallet.transactions.includes(transactionId)) {
      throw new BadRequestError('Invalid request')
    }
    try {
      const foundTransaction = await transactionModel.findOne({
        _id: transactionId,
      })
      const newAmount =
        foundTransaction.type === 'expense'
          ? foundTransaction.amount
          : -foundTransaction.amount

      // delete transaction
      const deletedTransaction = await transactionModel.deleteOne({
        _id: transactionId,
      })

      // update wallet
      await walletModel.findOneAndUpdate(
        {
          _id: walletId,
        },
        {
          $pull: { transactions: transactionId },
          $inc: { walletBalance: newAmount },
        }
      )
      return deletedTransaction
    } catch (error) {
      console.log(error)
      throw new InternalServerError('Delete transaction error')
    }
  }

  static deleteAllTransactions = async (transactionIds) => {
    try {
      const deletedTransactions = await transactionModel.deleteMany({
        _id: { $in: transactionIds },
      })
      return deletedTransactions
    } catch (error) {
      throw new InternalServerError('Delete all transactions error')
    }
  }
}

module.exports = TransactionService
