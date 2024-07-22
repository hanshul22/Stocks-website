const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockAnalyseController');

router.get('/analyze/:symbol', stockController.getStockAnalysis);

module.exports = router;
