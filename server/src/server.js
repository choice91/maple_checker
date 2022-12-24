import 'dotenv/config';
import './db';
import app from './app';
import { questResetScheduler, bossResetScheduler } from './scheduler';

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  questResetScheduler.start();
  bossResetScheduler.start();
});
