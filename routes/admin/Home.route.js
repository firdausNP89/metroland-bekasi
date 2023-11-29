const express = require('express');
// const roleController = require('../controllers/RoleController.js');
const homeController = require('../../controllers/Home.controller.js');
const router = express.Router();

router.get('/homes', homeController.homePage);

module.exports = router;