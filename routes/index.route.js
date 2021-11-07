var express = require('express');
var router = express.Router();

var userRoute = require("./user.route");
var mainRoute = require("./main.route");
var sourceRoute = require("./source.route");

router.use('/auth', userRoute);
router.use('/main', mainRoute);
router.use('/source', sourceRoute);

// This should be the last route else any after it won't work
router.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = router;