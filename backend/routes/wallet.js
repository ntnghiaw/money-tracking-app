const express = require('express');
const router = express.Router();

const walletsController = require('../controllers/wallet.js')


// Create new wallet
router.post('/', walletsController.createWallet);


module.exports = router;
