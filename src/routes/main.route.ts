import express from "express";
import auth from "../middleware/auth";
import * as mainController from "../controllers/main.controller";
import asyncHandler from "express-async-handler";

var router = express.Router();

router.post("/upload", auth, asyncHandler(mainController.upload));
router.post("/infomations", auth, asyncHandler(mainController.setinfomations));
router.get("/movies/:userId", asyncHandler(mainController.getmovies));
router.get("/mymovies", asyncHandler(mainController.getmymovies));

router.get("/profile/:userId", asyncHandler(mainController.getprofile));
router.post("/profile", asyncHandler(mainController.saveprofile));

router.post("/playlist", asyncHandler(mainController.saveplaylist));
router.get("/playlist/:userId", asyncHandler(mainController.loadplaylist));
router.delete("/playlist", asyncHandler(mainController.deleteplaylist));

router.post("/playlist/:playlistId", asyncHandler(mainController.addtoplaylist));
router.delete(
  "/playlist/:playlistId",
  asyncHandler(mainController.removefromplaylist)
);
router.post("/getlist", asyncHandler(mainController.getlist));

export default router;
