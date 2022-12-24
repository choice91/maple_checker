import cron from 'node-cron';
import db from './models';

export const questResetScheduler = cron.schedule(
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

export const bossResetScheduler = cron.schedule(
  '0 0 0 * * * 3',
  async () => {
    console.log('보스 데이터 초기화', new Date().toString());

    const bossDefaults = {
      zaqqum: false,
      magnus: false,
      hilla: false,
      papulatus: false,
      pierre: false,
      banban: false,
      bloodyQueen: false,
      vellum: false,
      pinkBean: false,
      lotus: false,
      damian: false,
      guardianAngelSlime: false,
      lucid: false,
      will: false,
      dusk: false,
      jinHilla: false,
      darknell: false,
      seren: false,
      kalos: false,
    };

    await db.Boss.updateMany({}, { $set: { boss: bossDefaults } });
  },
  {
    scheduled: false,
  }
);
