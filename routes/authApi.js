const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

//_______________________________API for Authentication_______________________________
router.post('/register', authController.register);

router.post('/login', authController.login);


module.exports = router;
