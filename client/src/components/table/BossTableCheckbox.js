import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { bossCheckToServer } from '../../redux/async/boss';
import bossSlice from '../../redux/slices/bossSlice';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const BOSS_TABLE = {
  자쿰: 'zaqqum',
  매그너스: 'magnus',
  힐라: 'hilla',
  파풀라투스: 'papulatus',
  피에르: 'pierre',
  반반: 'banban',
  '블러디 퀸': 'bloodyQueen',
  벨룸: 'vellum',
  핑크빈: 'pinkBean',
  시그너스: 'cygnus',
  스우: 'lotus',
  데미안: 'damian',
  '가디언 엔젤 슬라임': 'guardianAngelSlime',
  루시드: 'lucid',
  윌: 'will',
  더스크: 'dusk',
  진힐라: 'jinHilla',
  듄켈: 'darknell',
  세렌: 'seren',
  칼로스: 'kalos',
};

const BossTableCheckbox = ({ nickname, bossData, bossType, bossId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bossCheck = () => {
    dispatch(
      bossCheckToServer({
        data: { nickname, bossType: BOSS_TABLE[bossType] },
        navigate,
      })
    );
    dispatch(
      bossSlice.actions.bossCheckReducer({
        bossId,
        bossType: BOSS_TABLE[bossType],
      })
    );
  };

  return (
    <>
      <button onClick={bossCheck}>
        {bossData.boss[`${BOSS_TABLE[bossType]}`] ? (
          <CheckBoxIcon style={{ color: '#3498db' }} />
        ) : (
          <CheckBoxOutlineBlankIcon style={{ color: '#fff' }} />
        )}
      </button>
    </>
  );
};

export default BossTableCheckbox;
