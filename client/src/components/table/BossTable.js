import React from 'react';

import { TableRow, TableCell } from '@mui/material';
import { makeStyles } from '@mui/styles';

import TableCheckboxCell from './TableCheckboxCell';

const bossArray = {
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

const useStyles = makeStyles((theme) => ({
  tableCell: {
    backgroundColor: '#333',
    p: 0,
    color: '#fff',
    fontWeight: 700,
  },
}));

const BossTable = ({ ids, data }) => {
  const classes = useStyles();

  const bossKeys = Object.keys(bossArray);

  return (
    <>
      {bossKeys.map((key, index) => (
        <TableCheckboxCell
          key={index}
          ids={ids}
          dataType={key}
          dataName={bossArray[key]}
          data={data}
          category="boss"
        />
      ))}
    </>
  );
};

export default BossTable;
