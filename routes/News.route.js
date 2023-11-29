const express = require('express');
const newsService = require('../controllers/General.news.controller.js');
const router = express.Router();

router.get('/berita', newsService.newsPage);
router.get('/berita/:id/detail', newsService.detailPage);

module.exports = router;