import React from 'react';

import BossTableCheckbox from './BossTableCheckbox';

const BossTableTd = ({ ids, data, type }) => {
  return (
    <>
      {ids.map((id, index) => (
        <BossTableCheckbox
          index={index}
          nickname={data[`${id}`].nickname}
          bossData={data[`${id}`]}
          bossType={type}
          bossId={id}
        />
      ))}
    </>
  );
};

export default BossTableTd;
