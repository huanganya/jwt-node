var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

var userController = require('../controllers/user.controller');

router.post('/signin', userController.signin);
router.post('/signup', userController.signup);
router.post('/googlesign', userController.googlesign);

module.exports = router;