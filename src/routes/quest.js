import express from 'express';

import { isLoggedIn } from '../middlewares';
import { getDailyQuest, saveNickname } from '../controllers/quest';

const questRouter = express.Router();

questRouter.route('/').all(isLoggedIn).get(getDailyQuest);
questRouter.route('/nickname').all(isLoggedIn).post(saveNickname);

export default questRouter;
