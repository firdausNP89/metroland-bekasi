const express = require('express');
const abountController = require('../controllers/General.aboutUs.controller.js');
const router = express.Router();

router.get('/tentang-kami', abountController.aboutUsPage);

module.exports = router;