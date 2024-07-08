const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController')
const auth = require('../middlewares/auth');


router.post('/user/wallets',auth, walletController.createWallet)

router.get('/user/getAllWallets/:userId',auth, walletController.getAllWallets)
module.exports = router;