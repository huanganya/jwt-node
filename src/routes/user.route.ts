import express from "express";
import * as userController from "../controllers/user.controller";

var router = express.Router();

router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.post("/googlesign", userController.googlesign);

export default router;
