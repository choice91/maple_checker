import React from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const BossTableCheckbox = ({ nickname, bossData, bossType, bossId }) => {
  return (
    <>
      <button>
        {bossData.boss[`${bossType}`] ? (
          <CheckBoxIcon style={{ color: '#3498db' }} />
        ) : (
          <CheckBoxOutlineBlankIcon style={{ color: '#fff' }} />
        )}
      </button>
    </>
  );
};

export default BossTableCheckbox;
