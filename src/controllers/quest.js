import Quest from '../models/quest';

export const saveNickname = async (req, res) => {
  const { nickname } = req.body;

  try {
    const nicknameIsExists = await Quest.exists({ nickname });

    if (nicknameIsExists) {
      res.status(400).json({
        ok: false,
        message: '이미 존재하는 닉네임입니다.',
      });
      return;
    }

    await Quest.create({
      owner: res.locals.user._id,
      nickname,
    });

    res.status(200).json({
      ok: true,
    });
  } catch (err) {
    res.status(404);
  }
};
