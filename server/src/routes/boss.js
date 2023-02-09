import express from "express";

import { asyncHandler, authJWT } from "../middlewares";
import bossCtrl from "../controllers/boss";

const bossRouter = express.Router();

bossRouter
  .route("/")
  .all(authJWT)
  .get(asyncHandler(bossCtrl.getBossData))
  .post(asyncHandler(bossCtrl.addCharacter));
bossRouter.route("/check").all(authJWT).post(asyncHandler(bossCtrl.bossCheck));
bossRouter
  .route("/reset")
  .all(authJWT)
  .post(asyncHandler(bossCtrl.resetBossData));
bossRouter
  .route("/swap")
  .all(authJWT)
  .put(asyncHandler(bossCtrl.changeSequence));
bossRouter
  .route("/:bossId")
  .all(authJWT)
  .put(asyncHandler(bossCtrl.updateCharacterInfo))
  .delete(asyncHandler(bossCtrl.deleteCharacter));

export default bossRouter;
