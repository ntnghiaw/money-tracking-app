const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transaction');



router.get('/:transactionId', transactionsController.getTransaction);
router.get('/', transactionsController.getAllTransactions);
router.post('/', transactionsController.createTransaction);
router.post('/:transactionId', transactionsController.updateTransaction);
router.delete('/:transactionId', transactionsController.deleteTransaction);
router.post('/ocr', transactionsController.ocr);


module.exports = router;
