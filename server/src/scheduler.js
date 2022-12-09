import cron from 'node-cron';
import db from './models';

const scheduler = cron.schedule(
  '0 0 0 * * * *',
  async () => {
    console.log('스케줄러 실행됨', new Date().toString());

    const questDefaults = {
      yeoro: false,
      chuchu: false,
      lachelein: false,
      arcana: false,
      morass: false,
      esfera: false,
      cernium: false,
      burningCernium: false,
      arcs: false,
      odium: false,
    };

    await db.Quest.updateMany({}, { $set: { quests: questDefaults } });
  },
  {
    scheduled: false,
  }
);

export default scheduler;
