import express from "express";

import userCtrl from "../controllers/user";
import authCtrl from "../controllers/auth";
import { asyncHandler } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route("/login").post(asyncHandler(userCtrl.login));
rootRouter.route("/join").post(asyncHandler(userCtrl.signup));
rootRouter.route("/id-check").post(asyncHandler(userCtrl.idCheck));
rootRouter.route("/refresh").get(asyncHandler(authCtrl.reissueToken));

export default rootRouter;
