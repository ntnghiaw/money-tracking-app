'use strict'

const { BadRequestError } = require('../core/error.response')
const { categoryModel } = require('../models/category.model')
const userModel = require('../models/user.model')
const { getInfoData } = require('../utils')

class UserService {
  static create = async (user) => {
    const categories = await categoryModel.find().select('_id').lean()
    try {
      return await userModel.create({
        ...user,
        categories,
      })
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
    try {
      const foundUser = await userModel
        .findOne({ email })
        // .populate({
        //   path: 'wallets',
        // })
        .select(select)
        .lean()
      return foundUser
    } catch (error) {
      throw new BadRequestError('User not found')
    }
    
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

  static getInfo = async (userId) => {
    const user = await userModel.findById(userId)
    return getInfoData({object: user, fields: ['_id', 'name', 'email', 'avatarUrl', 'gender', 'dateOfBirth']})
  }

  static removeWalletById = async (userId, walletId) => {
    return await userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { wallets: walletId } },
      { new: true })
  }
}

module.exports = UserService
