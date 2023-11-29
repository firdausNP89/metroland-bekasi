const express = require('express');
const locationController = require('../controllers/General.location.controller.js');
const router = express.Router();

router.get('/lokasi', locationController.locationPage);

module.exports = router;