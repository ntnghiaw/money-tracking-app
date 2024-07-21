const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const walletController = require('../controllers/walletController')
const auth = require('../middlewares/auth');



router.post('/user/register', userController.register);

router.post('/user/login', userController.login)


router.get('/user/getAllWallets/:userId',auth, walletController.getAllWallets)
module.exports = router;