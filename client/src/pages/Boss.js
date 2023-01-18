import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mui/material';

import { getBossData } from '../redux/async/boss';

import Header from '../components/Header';
import AddModal from '../components/modal/AddModal';
import UpdateModal from '../components/modal/UpdateModal';
import DelConfirmModal from '../components/modal/DelConfirmModal';
import BossDesktop from '../components/desktop/BossDesktop';
import BossMobile from '../components/mobile/BossMobile';

const weeklyArray = {
  zaqqum: '자쿰',
  magnus: '매그너스',
  hilla: '힐라',
  papulatus: '파풀라투스',
  pierre: '피에르',
  banban: '반반',
  bloodyQueen: '블러디 퀸',
  vellum: '벨룸',
  pinkBean: '핑크빈',
  cygnus: '시그너스',
  lotus: '스우',
  damian: '데미안',
  guardianAngelSlime: '가디언 엔젤 슬라임',
  lucid: '루시드',
  will: '윌',
  dusk: '더스크',
  jinHilla: '진힐라',
  darknell: '듄켈',
  seren: '세렌',
  kalos: '칼로스',
};

const monthlyArray = {
  blackMagician: '검은마법사',
};

const Boss = () => {
  const dispatch = useDispatch();

  const { errorMessage } = useSelector((state) => state.boss);
  const { isAddModalOpen, isUpdateModalOpen, isDelModalOpen } = useSelector(
    (state) => state.modal
  );

  const isMobile = useMediaQuery('(max-width: 760px)');

  React.useEffect(() => {
    dispatch(getBossData());
  }, []);

  return (
    <>
      <Header page="boss" />

      {isMobile ? (
        <BossMobile weeklyArray={weeklyArray} monthlyArray={monthlyArray} />
      ) : (
        <BossDesktop weeklyArray={weeklyArray} monthlyArray={monthlyArray} />
      )}

      <AddModal
        page="boss"
        isAddModalOpen={isAddModalOpen}
        errorMessage={errorMessage}
      />
      <DelConfirmModal page="boss" isDelModalOpen={isDelModalOpen} />
      <UpdateModal page="boss" isUpdateModalOpen={isUpdateModalOpen} />
    </>
  );
};

export default Boss;
