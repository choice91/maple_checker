import React from 'react';

import BossTableTd from './BossTableTd';

const TableTr = ({ bossName, ids, bossData }) => {
  return (
    <>
      <tr>
        <td>{bossName}</td>
        <BossTableTd ids={ids} data={bossData} type={bossName} />
      </tr>
    </>
  );
};

export default TableTr;
