const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.js')

// Đăng ký tài khoản
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

module.exports = router;
