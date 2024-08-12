'use strict'

const userModel = require('../models/user.model')

class UserService {
  static create = async (user) => {
    try {
      return await userModel.create(user)
    } catch (error) {
      throw new Error('Create new user error')
    }
  }

  static updateInfo = async ({
    userId,
    user: { name, dateOfBirth, sex, avatarUrl },
  }) => {
    const filter = { _id: userId },
      update = { name, dateOfBirth, sex, avatarUrl },
      options = { new: true, update: true }
    return await userModel.findOneAndUpdate(filter, update, options).lean()
  }

  static findByEmail = async ({
    email,
    select = {
      name: 1,
      email: 1,
    },
  }) => {
    return await userModel.findOne({ email }).select(select).lean()
  }

  static findById = async (userId) => {
    return await userModel.findById(userId)
  }

  static addWalletById = async (userId, walletId) => {
    return await userModel.findOneAndUpdate(
      { _id: userId },
      { $push: { wallets: walletId } },
      { new: true }
    )
  }

  static removeWalletById = async (userId, walletId) => {
    return await userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { wallets: walletId } },
      { new: true })
  }
}

module.exports = UserService
