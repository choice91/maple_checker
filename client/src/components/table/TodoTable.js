import React from 'react';

import { TableRow, TableCell } from '@mui/material';

import CustomTableCell from './CustomTableCell';
import TableCheckboxCell from './TableCheckboxCell';

const questArray = {
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

const weaklyArray = {
  yeoro: '여로',
  chuchu: '츄츄',
  lachelein: '레헬른',
  arcana: '아르카나',
  morass: '모라스',
  esfera: '에스페라',
};

const monsterParkArray = {
  normal: '몬스터파크',
  extreme: '익스트림 몬스터파크',
};

const TodoTable = ({ ids, data }) => {
  const questKeys = Object.keys(questArray);
  const weaklyKeys = Object.keys(weaklyArray);
  const parkKeys = Object.keys(monsterParkArray);

  return (
    <>
      <TableRow>
        <TableCell
          align="center"
          sx={{
            backgroundColor: '#333',
            p: 0,
            color: '#fff',
            fontWeight: 700,
            cursor: 'default',
          }}
        >
          일일
        </TableCell>
        <CustomTableCell colSpan={ids.length} bgColor="#333"></CustomTableCell>
      </TableRow>
      {questKeys.map((key, index) => (
        <TableCheckboxCell
          key={index}
          ids={ids}
          dataType={key}
          dataName={questArray[key]}
          data={data}
          category="quest"
        />
      ))}

      <TableRow>
        <TableCell
          align="center"
          sx={{
            backgroundColor: '#333',
            p: 0,
            color: '#fff',
            fontWeight: 700,
            cursor: 'default',
          }}
        >
          주간
        </TableCell>
        <CustomTableCell colSpan={ids.length} bgColor="#333"></CustomTableCell>
      </TableRow>
      {weaklyKeys.map((key, index) => (
        <TableCheckboxCell
          key={index}
          ids={ids}
          dataType={key}
          dataName={weaklyArray[key]}
          data={data}
          category="weakly"
        />
      ))}
      {parkKeys.map((key, index) => (
        <TableCheckboxCell
          key={index}
          ids={ids}
          dataType={key}
          dataName={monsterParkArray[key]}
          data={data}
          category="monsterPark"
        />
      ))}
    </>
  );
};

export default TodoTable;
