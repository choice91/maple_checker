import React from 'react';
import { useLocation } from 'react-router-dom';

import TableTr from './TableTr';

const QUEST_ARRAY = {
  yeoro: '여로',
  chuchu: '츄츄',
  lachelein: '레헬른',
  arcana: '아르카나',
  morass: '모라스',
  esfera: '에스페라',
  cernium: '세르니움(전)',
  burningCernium: '세르니움(후)',
  arcs: '아르크스',
  odium: '오디움',
};
const BOSS_ARRAY = {
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

const TableContent = ({ ids, data }) => {
  const location = useLocation();

  const questKeys = Object.keys(QUEST_ARRAY);
  const bossKeys = Object.keys(BOSS_ARRAY);

  return (
    <>
      {location.pathname === '/quest' ? (
        <>
          {questKeys.map((key, index) => (
            <>
              <TableTr
                index={index}
                dataType={key}
                name={QUEST_ARRAY[key]}
                ids={ids}
                data={data}
                pathname="quest"
              />
            </>
          ))}
        </>
      ) : (
        <>
          {bossKeys.map((key, index) => (
            <>
              <TableTr
                index={index}
                dataType={key}
                name={BOSS_ARRAY[key]}
                ids={ids}
                data={data}
                pathname="boss"
              />
            </>
          ))}
        </>
      )}
    </>
  );
};

export default TableContent;
