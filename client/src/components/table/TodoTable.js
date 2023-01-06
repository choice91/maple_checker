import React from 'react';
import { useSelector } from 'react-redux';

import TableCheckboxCell from './TableCheckboxCell';

const dailyArray = {
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

const weeklyArray = {
  yeoro: '여로',
  chuchu: '츄츄',
  lachelein: '레헬른',
  arcana: '아르카나',
  morass: '모라스',
  esfera: '에스페라',
};

const TodoTable = ({ ids, data }) => {
  const dailyKey = Object.keys(dailyArray);
  const weeklyKeys = Object.keys(weeklyArray);

  const { category } = useSelector((state) => state.todo);

  return (
    <>
      {category === 'daily'
        ? dailyKey.map((key, index) => (
            <TableCheckboxCell
              key={index}
              ids={ids}
              dataType={key}
              dataName={dailyArray[key]}
              data={data}
              category="daily"
              page="todo"
            />
          ))
        : weeklyKeys.map((key, index) => (
            <TableCheckboxCell
              key={index}
              ids={ids}
              dataType={key}
              dataName={weeklyArray[key]}
              data={data}
              category="weekly"
              page="todo"
            />
          ))}
    </>
  );
};

export default TodoTable;
