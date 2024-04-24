const express = require('express');
const router = express.Router();

const transactionsController = require('../controllers/transaction')

router.post('/ocr', transactionsController.ocr);

module.exports = router;
