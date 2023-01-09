import cron from 'node-cron';
import db from './models';

export const dailyResetScheduler = cron.schedule(
  '0 0 0 * * * *',
  async () => {
    console.log('일퀘 데이터 초기화', new Date().toString());

    const dailyQuestDefault = {
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

    await db.Todo.updateMany({}, { $set: { daily: dailyQuestDefault } });
  },
  {
    scheduled: false,
  }
);

export const weeklyResetScheduler = cron.schedule(
  '0 0 0 * * * 3',
  async () => {
    console.log('보스 데이터 초기화', new Date().toString());

    const weeklyBossDefault = {
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

    const weeklyQuestDefault = {
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

    await db.Boss.updateMany({}, { $set: { weekly: weeklyBossDefault } });
    await db.Todo.updateMany({}, { $set: { weekly: weeklyQuestDefault } });
  },
  {
    scheduled: false,
  }
);

export const monthlyResetScheduler = cron.schedule(
  '0 0 0 1 * * *',
  async () => {
    console.log('월간 데이터 초기화', new Date().toString());

    const monthlyBossDefault = { blackMagician: false };

    await db.Todo.updateMany({}, { $set: { monthly: monthlyBossDefault } });
  },
  {
    scheduled: false,
  }
);
