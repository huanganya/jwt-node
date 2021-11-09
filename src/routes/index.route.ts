import express from "express";
import userRoute from "./user.route";
import mainRoute from "./main.route";
import sourceRoute from "./source.route";

var router = express.Router();

router.use("/auth", userRoute);
router.use("/main", mainRoute);
router.use("/source", sourceRoute);

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

export default router;
