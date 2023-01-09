import React from 'react';
import { useSelector } from 'react-redux';

import TableCheckboxCell from './TableCheckboxCell';

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

const BossTable = ({ ids, data }) => {
  const weeklyKeys = Object.keys(weeklyArray);
  const monthlyKeys = Object.keys(monthlyArray);

  const { category } = useSelector((state) => state.boss);

  return (
    <>
      {category === 'weekly'
        ? weeklyKeys.map((key, index) => (
            <TableCheckboxCell
              key={index}
              ids={ids}
              dataType={key}
              dataName={weeklyArray[key]}
              data={data}
              category="weekly"
              page="boss"
            />
          ))
        : monthlyKeys.map((key, index) => (
            <TableCheckboxCell
              key={index}
              ids={ids}
              dataType={key}
              dataName={monthlyArray[key]}
              data={data}
              category="monthly"
              page="boss"
            />
          ))}
    </>
  );
};

export default BossTable;
