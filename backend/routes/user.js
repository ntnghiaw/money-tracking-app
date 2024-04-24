const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user.js')

// Get user by userId
router.get('/:userId', usersController.get);
router.put('/:userId', usersController.update)
// Đăng nhập

module.exports = router;
