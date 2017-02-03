var express = require('express');
var router = express.Router();
router.use('/api/products', require('./productsRouter'));
module.exports = router;