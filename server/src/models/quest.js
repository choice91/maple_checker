import mongoose from 'mongoose';

const questSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
    nickname: {
      type: String,
      required: true,
    },
    quests: {
      yeoro: { type: Boolean, default: false },
      chuchu: { type: Boolean, default: false },
      lachelein: { type: Boolean, default: false },
      arcana: { type: Boolean, default: false },
      morass: { type: Boolean, default: false },
      esfera: { type: Boolean, default: false },
      cernium: { type: Boolean, default: false },
      burningCernium: { type: Boolean, default: false },
      arcs: { type: Boolean, default: false },
      odium: { type: Boolean, default: false },
    },
  },
  {
    versionKey: false,
  }
);

const Quest = mongoose.model('Quest', questSchema);

export default Quest;
