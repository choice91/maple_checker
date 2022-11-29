import express from 'express';

import { isLoggedIn } from '../middlewares';
import { saveNickname } from '../controllers/quest';

const questRouter = express.Router();

questRouter.route('/nickname').all(isLoggedIn).post(saveNickname);

export default questRouter;
