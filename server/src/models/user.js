import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    refreshToken: { type: String },
    todoSeq: { type: [mongoose.Schema.Types.ObjectId], ref: 'Todo' },
    bossSeq: { type: [mongoose.Schema.Types.ObjectId], ref: 'Boss' },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model('User', userSchema);

export default User;
