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
    quest: {
      type: [{ questName: String, check: Boolean }],
      default: [
        { questName: 'yeoro', check: false },
        { questName: 'chuchu', check: false },
        { questName: 'lachelein', check: false },
        { questName: 'arcana', check: false },
        { questName: 'morass', check: false },
        { questName: 'esfera', check: false },
        { questName: 'cernium', check: false },
        { questName: 'buringCernium', check: false },
        { questName: 'arcs', check: false },
        { questName: 'odium', check: false },
      ],
    },
  },
  {
    versionKey: false,
  }
);

const Quest = mongoose.model('Quest', questSchema);

export default Quest;
