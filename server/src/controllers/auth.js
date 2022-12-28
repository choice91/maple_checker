import jwt from 'jsonwebtoken';

import { signAccessToken, verifyRefreshToken, verifyToken } from '../utils/jwt';

export default {
  reissueToken: async (req, res) => {
    const { authorization, refresh } = req.headers;

    if (!authorization) {
      res.status(401).json({
        ok: false,
        errorMessage: '토큰이 존재하지 않음',
      });
      return;
    }

    const accessToken = authorization.split(' ')[1];
    const refreshToken = refresh.split(' ')[1];

    // 액세스 토큰 검증 (accessResult.ok === true 이면 유효, false이면 만료)
    const accessResult = verifyToken(accessToken);

    // Access Token 디코딩하여 유저정보 불러오기
    const decoded = jwt.decode(accessToken);

    // 리프래쉬 토큰 검증 (true이면 유효, false이면 만료)
    const refreshResult = await verifyRefreshToken(refreshToken, decoded.id);

    if (accessResult.ok === false && accessResult.message === 'jwt expired') {
      // Access Token과 Refresh Token 모두 만료됨
      if (refreshResult === false) {
        res.status(401).json({
          ok: false,
          errorMessage: '인증 만료',
        });
      } else {
        // Access Token만 만료됨
        const newAccessToken = await signAccessToken(
          decoded.id,
          decoded.username
        );

        res.status(200).json({
          ok: true,
          token: {
            accessToken: newAccessToken,
            refreshToken,
          },
        });
      }
    } else {
      res.status(200).json({
        ok: true,
        message: '토큰이 만료되지 않음',
      });
    }
  },
};
