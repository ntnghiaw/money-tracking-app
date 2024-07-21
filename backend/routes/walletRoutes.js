const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController')
const auth = require('../middlewares/auth');


router.post('/user/wallets',auth, walletController.createWallet)

router.get('/user/getAllWallets/:userId',auth, walletController.getAllWallets)
router.get('/user/wallets/:userId/:walletId', auth, walletController.getDetailedWallet)

router.put('/user/wallets/:userId/:walletId', auth, walletController.modifyWallet)

router.delete('/user/wallets/:userId/:walletId', auth, walletController.deleteWallet)
module.exports = router;