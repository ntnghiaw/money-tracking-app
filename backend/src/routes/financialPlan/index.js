'use strict'

const express = require('express')
const financialPlanController = require('../../controllers/financialPlan.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

// authentication
router.use(authentication)

router.get('/:walletId', asyncHandler(financialPlanController.getAllFinancialPlans))
router.get('/:walletId/:planId', asyncHandler(financialPlanController.getFinancialPlan))
router.post('/:walletId', asyncHandler(financialPlanController.createFinancialPlan))
router.post('/:walletId/:planId', asyncHandler(financialPlanController.updateFinancialPlan))
router.delete('/:walletId/:planId', asyncHandler(financialPlanController.deleteFinancialPlan))

module.exports = router
