'use strict'

const UserService = require('../services/user.service')
const { CREATED, SuccessResponse } = require('../core/success.response')

class UserController {
  updateInfo = async (req, res, next) => {
    const { userId } = req.params
    new SuccessResponse({
      message: 'Update info success!',
      metadata: await UserService.updateInfo({userId, user: req.body}),
    }).send(res)
  }
  getInfo = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get info success!',
      metadata: await UserService.getInfo(req.headers['x-client-id']),
    }).send(res)
  }
}

module.exports = new UserController()
