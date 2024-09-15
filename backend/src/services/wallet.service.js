'use strict'
const {
  walletModel,
  individualWalletModel,
  groupWalletModel,
} = require('../models/wallet.model')
const UserServices = require('./user.service')
const {
  BadRequestError,
  InternalServerError,
} = require('../core/error.response')
const userModel = require('../models/user.model')
const transactionModel = require('../models/transaction.model')
const TransactionService = require('./transaction.service')
const { getInfoData } = require('../utils')


   const getAllWallets = async (userId) => {
    const foundUser = await UserServices.findById(userId)
    if (!foundUser) {
      throw new BadRequestError('Invalid user')
    }
    return await walletModel.find({ _id: { $in: foundUser.wallets } })
   
  }

   const createWallet = async ({userId, wallet}) =>  {
    const foundUser = await userModel.findById(userId)
    if (!foundUser) {
      throw new BadRequestError('Invalid user')
    }
    const newWallet = await walletModel.create({
      ...wallet,
      currency: 'VND',
    })
    if (!newWallet) {
      throw new BadRequestError('Cannot create wallet')
    }
    try {
      await UserServices.addWalletById(userId, newWallet._id)
      return getInfoData({
        object: newWallet,
        fields: ['_id', 'name', 'currency', 'balance', 'type'],
      })
    } catch (error) { 
      // Rollback
      console.log(error)
      await walletModel.deleteOne({ _id: newWallet._id })
      throw new InternalServerError('Cannot create wallet')
    }
  }

   const addTransaction = async({userId, walletId, transaction}) => {
     
  }

   const removeTransaction = async({ walletId, transactionId}) => {
    const foundWallet = await walletModel.findById(walletId).lean()
    if (!foundWallet ) {
      throw new BadRequestError('Invalid wallet')
    }
    try {
      const updatedWallet = await walletModel.findOneAndUpdate(
        { _id: walletId },
        {
          $pull: { transactions: transactionId }
        },
        { new: true }
      )
    
       return updatedWallet
      } catch (error) {
        throw new InternalServerError('Cannot update wallet')
      }
    

  }

   const findById = async(walletId)  => {
    return await walletModel.findById(walletId)
  }

   const getWalletById = async (userId, walletId) => {
    const foundUser = await UserServices.findById(userId)
    if (!foundUser) {
      throw new BadRequestError('Invalid user')
    }
    return await walletModel.findOne({ _id: walletId }).populate({
      path: 'transactions',
      populate: {
        path: 'category',
        select: ['_id', 'name', 'icon'],
      },
      options: { sort: { createdAt: -1 } },
    }).lean()
  }


   const updateBalance = async({walletId, amount}) => {
    return await walletModel.findOneAndUpdate(
      { _id: walletId },
      { $inc: { walletBalance: amount } },
      { new: true }
    )
  }

 

   const deleteById = async ({userId, walletId}) => {
    const foundUser = await UserServices.findById(userId)
    if (!foundUser) {
      throw new BadRequestError('Invalid user')
    }
    try {
     const wallet = await walletModel.findById(walletId).lean()

      const deletedWallet = await walletModel.deleteOne({ _id: walletId })
      await TransactionService.deleteAllTransactions(wallet?.transactions)
      await UserServices.removeWalletById(userId, walletId)
      return deletedWallet
    } catch (error) { 
      console.log(error)
      throw new InternalServerError('Cannot delete wallet')
    }
   }

   const updateWallet = async ({userId, walletId, wallet}) => {
    const foundUser = await UserServices.findById(userId)
    if (!foundUser || !foundUser.wallets.includes(walletId)) {
      throw new BadRequestError('Invalid user')
    }
    const updateWallet = {
      name: wallet?.name,
      currency: wallet?.currency,
    }
    return await walletModel.findOneAndUpdate({ _id: walletId }, updateWallet, {
      new: true,
    })
   }
  

module.exports = {
  getAllWallets,
  createWallet,
  findById,
  getWalletById,
  deleteById,
  updateWallet,
}
