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
}

module.exports = new UserController()
