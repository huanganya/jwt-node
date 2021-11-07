var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");

var mainController = require('../controllers/main.controller');
const { route } = require('./user.route');

router.post('/upload', auth, mainController.upload);
router.post('/setinfomations', auth, mainController.setinfomations);
router.post('/getmovies', mainController.getmovies);
router.post('/getmymovies', mainController.getmymovies);

router.post('/getprofile', mainController.getprofile);
router.post('/saveprofile', mainController.saveprofile);

router.post('/saveplaylist', mainController.saveplaylist);
router.post('/loadplaylist', mainController.loadplaylist);
router.post('/deleteplaylist', mainController.deleteplaylist);

router.post('/addtoplaylist', mainController.addtoplaylist);
router.post('/removefromplaylist', mainController.removefromplaylist);
router.post('/getlist', mainController.getlist);

module.exports = router;