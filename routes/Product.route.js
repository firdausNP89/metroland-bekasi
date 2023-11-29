const express = require('express');
const productService = require('../controllers/General.product.controller.js');
const router = express.Router();

router.get('/produk/:id', productService.productPage);

module.exports = router;