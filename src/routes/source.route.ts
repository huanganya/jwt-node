import express from "express";
import * as sourceController from "../controllers/source.controller";

var router = express.Router();
router.post("/:id", /*auth,*/ sourceController.download);

export default router;
