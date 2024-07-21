const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/category');


router.post('/', categoriesController.createCategory);


module.exports = router;
