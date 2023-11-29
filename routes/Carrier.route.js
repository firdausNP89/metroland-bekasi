const express = require('express');
const carrierController = require('../controllers/General.carrier.controller.js');
const router = express.Router();

router.get('/karir', carrierController.carrierPage);

module.exports = router;