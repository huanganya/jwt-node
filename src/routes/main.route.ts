import express from "express";
import auth from "../middleware/auth";
import * as mainController from "../controllers/main.controller";
import asyncHandler from "express-async-handler";

var router = express.Router();

router.post("/upload", auth, asyncHandler(mainController.upload));
router.post(
  "/setinfomations",
  auth,
  asyncHandler(mainController.setinfomations)
);
router.post("/getmovies", asyncHandler(mainController.getmovies));
router.post("/getmymovies", asyncHandler(mainController.getmymovies));

router.post("/getprofile", asyncHandler(mainController.getprofile));
router.post("/saveprofile", asyncHandler(mainController.saveprofile));

router.post("/saveplaylist", asyncHandler(mainController.saveplaylist));
router.post("/loadplaylist", asyncHandler(mainController.loadplaylist));
router.post("/deleteplaylist", asyncHandler(mainController.deleteplaylist));

router.post("/addtoplaylist", asyncHandler(mainController.addtoplaylist));
router.post(
  "/removefromplaylist",
  asyncHandler(mainController.removefromplaylist)
);
router.post("/getlist", asyncHandler(mainController.getlist));

export default router;
