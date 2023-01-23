import mongoose from 'mongoose';

const bossSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    nickname: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    weekly: {
      zaqqum: { type: Boolean, default: false },
      magnus: { type: Boolean, default: false },
      hilla: { type: Boolean, default: false },
      papulatus: { type: Boolean, default: false },
      pierre: { type: Boolean, default: false },
      banban: { type: Boolean, default: false },
      bloodyQueen: { type: Boolean, default: false },
      vellum: { type: Boolean, default: false },
      pinkBean: { type: Boolean, default: false },
      cygnus: { type: Boolean, default: false },
      lotus: { type: Boolean, default: false },
      damian: { type: Boolean, default: false },
      guardianAngelSlime: { type: Boolean, default: false },
      lucid: { type: Boolean, default: false },
      will: { type: Boolean, default: false },
      dusk: { type: Boolean, default: false },
      jinHilla: { type: Boolean, default: false },
      darknell: { type: Boolean, default: false },
      seren: { type: Boolean, default: false },
      kalos: { type: Boolean, default: false },
    },
    monthly: {
      blackMagician: { type: Boolean, default: false },
    },
  },
  { versionKey: false }
);

const Boss = mongoose.model('Boss', bossSchema);

export default Boss;
