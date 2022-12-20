import React from 'react';

import BossTableCheckbox from './BossTableCheckbox';

const BossTableTd = ({ ids, data, type }) => {
  return (
    <>
      {ids.map((id, index) => (
        <td key={index}>
          <BossTableCheckbox
            nickname={data[`${id}`].nickname}
            bossData={data[`${id}`]}
            bossType={type}
            bossId={id}
          />
        </td>
      ))}
    </>
  );
};

export default BossTableTd;
