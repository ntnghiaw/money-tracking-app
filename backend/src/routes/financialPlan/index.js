'use strict'

const express = require('express')
const financialPlanController = require('../../controllers/financialPlan.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

// authentication
router.use(authentication)

router.get(
  '/:walletId',
  asyncHandler(financialPlanController.createFinancialPlan)
)



module.exports = router
