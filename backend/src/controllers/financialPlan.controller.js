const { SuccessResponse, CREATED } = require('../core/success.response');
const FinancialPlanService = require('../services/financialPlan.service');


class FinancialPlanController {
  createFinancialPlan = async (req, res, next) => {
    console.log(req.body)
    new CREATED({
      message: 'Create financial plan success!',
      metadata: await FinancialPlanService.createFinancialPlan({
        type: req.body.type,
        walletId: req.params.walletId,
        payload: req.body,
      }),
    }).send(res)
  }

  updateFinancialPlan = async (req, res, next) => {
    new SuccessResponse({
      message: 'Update financial plan success!',
      metadata: await FinancialPlanService.updateFinancialPlan({
        type: req.body.type,
        walletId: req.params.walletId,
        planId: req.params.planId,
        payload: req.body,
      }),
    }).send(res)
  }

  deleteFinancialPlan = async (req, res, next) => {
    new SuccessResponse({
      message: 'Delete financial plan success!',
      metadata: await FinancialPlanService.deleteFinancialPlan({
        walletId: req.params.walletId,
        planId: req.params.planId,
      }),
    }).send(res)
  }

  getFinancialPlan = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get all financial plans success!',
      metadata: await FinancialPlanService.getFinancialPlan({
        walletId: req.params.walletId,
        planId: req.params.planId,
      }),
    }).send(res)
  }

  getAllFinancialPlans = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get all financial plans success!',
      metadata: await FinancialPlanService.getAllFinancialPlans({
        walletId: req.params.walletId,
      }),
    }).send(res)
  }
  

}

module.exports = new FinancialPlanController();