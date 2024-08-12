'use strict'

const express = require('express')
const transactionController = require('../../controllers/transaction.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

// authentication
router.use(authentication)

router.get('/:walletId', asyncHandler(transactionController.getAllTransactions))
router.get('/:walletId/:transactionId', asyncHandler(transactionController.getTransactionById))
router.post('/:walletId', asyncHandler(transactionController.createTransaction))
router.post('/:walletId/:transactionId', asyncHandler(transactionController.updateTransaction))
router.delete('/:walletId/:transactionId',  asyncHandler(transactionController.deleteTransactionById))

module.exports = router
