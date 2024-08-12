const FinancialPlanService = require('../services/financialPlan.service');


class FinancialPlanController {


  createFinancialPlan = async (req, res, next) => {
    const newPlan = await FinancialPlanService.createFinancialPlan({
      type: req.body.type,
      walletId: req.params.walletId,
      payload: req.body
    });
    res.status(201).json(newPlan);
  }


}

module.exports = new FinancialPlanController();