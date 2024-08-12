'use strict'

const express = require('express')
const walletController = require('../../controllers/wallet.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()


// authentication
router.use(authentication)


router.get('', asyncHandler(walletController.getAllWallets))
router.get('/:id', asyncHandler(walletController.getWalletById))
router.post('', asyncHandler(walletController.createWallet))
router.post('/:id', asyncHandler(walletController.updateWallet))
router.delete('/:id', asyncHandler(walletController.deleteWalletById))
module.exports = router
