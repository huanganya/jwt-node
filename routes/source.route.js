var express = require('express');
var router = express.Router();

var sourceController = require('../controllers/source.controller');

router.post('/:id', /*auth,*/ sourceController.download);

module.exports = router;