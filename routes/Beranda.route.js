const express = require('express');
const berandaController = require('../controllers/General.beranda.controller.js');
const berandaAPI = require('../controllers/General.api.beranda.controller.js');
const router = express.Router();

router.get('/', berandaController.berandaPage);
router.get('/beranda', berandaController.berandaPage);

// -------------- API
router.get('/beranda/api/v1/promo', berandaAPI.getPromo);

module.exports = router;