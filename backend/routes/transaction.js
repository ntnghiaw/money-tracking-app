const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transaction');
const asyncHandler = require('../middlewares/asyncErrorHandler');



router.get('/:transactionId', asyncHandler(transactionsController.getTransactionById));
router.get('/', asyncHandler(transactionsController.getAllTransactions));
router.post('/', asyncHandler(transactionsController.createTransaction));
router.post('/:transactionId', asyncHandler(transactionsController.updateTransaction));
router.delete('/:transactionId', asyncHandler(transactionsController.deleteTransaction));
router.post('/ocr', asyncHandler(transactionsController.ocr));


module.exports = router;
