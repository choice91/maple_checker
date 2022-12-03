import express from 'express';

import { isLoggedIn } from '../middlewares';
import {
  questComplete,
  getDailyQuest,
  saveNickname,
} from '../controllers/quest';

const questRouter = express.Router();

questRouter.route('/').all(isLoggedIn).get(getDailyQuest).post(questComplete);
questRouter.route('/nickname').all(isLoggedIn).post(saveNickname);

export default questRouter;
