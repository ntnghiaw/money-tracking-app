const { filter } = require('lodash')
const { CREATED, SuccessResponse } = require('../core/success.response')
const TransactionService = require('../services/transaction.service')
const { HEADER } = require('../auth/authUtils')

class TransactionController {
  getAllTransactions = async (req, res) => {
    const {walletId} = req.params
    new SuccessResponse({
      message: 'Get transactions success!',
      metadata: await TransactionService.getAllTransactions({
        walletId: walletId,
        options: {
          limit: req.query.limit ? parseInt(req.query.limit) : 10,
          offset: req.query.offset ? req.query.offset : '',
          sort: req.query.sort ? req.query.sort : 'desc',
          filter: req.query.filter ? req.query.filter : 'daily',
        },
      }),
    }).send(res)
  }

  getTransactionById = async (req, res) => {
    new SuccessResponse({
      message: 'Get wallet success!',
      metadata: await TransactionService.getTransactionById({ walletId: req.params.walletId, transactionId: req.params.transactionId }),
    }).send(res)
  }
  createTransaction = async (req, res) => {
    new CREATED({
      message: 'Create transaction success!',
      metadata: await TransactionService.createTransaction({
        userId: req.headers[HEADER.CLIENT_ID],
        walletId: req.params.walletId,
        transaction: req.body,
      }),
    }).send(res)
  }
  updateTransaction = async (req, res) => { 
    new SuccessResponse({
      message: 'Update wallet success!',
      metadata: await TransactionService.updateTransaction({
        walletId: req.params.walletId,
        transactionId: req.params.transactionId,
        transaction: req.body,
      }),
    }).send(res)
  }
  deleteTransactionById =  async (req, res) => {
    new SuccessResponse({
      message: 'Delete wallet success!',
      metadata: await TransactionService.deleteTransactionById({
        userId: req.headers[HEADER.CLIENT_ID],
        walletId: req.params.walletId,
        transactionId: req.params.transactionId,
      }),
    }).send(res)
  }
}

module.exports = new TransactionController()