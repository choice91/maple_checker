import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { bossCheckToServer } from '../../redux/async/boss';
import { questCheck } from '../../redux/async/quest';
import bossSlice from '../../redux/slices/bossSlice';
import questSlice from '../../redux/slices/questSlice';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const TableTd = ({ index, dataType, dataId, data, pathname }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheck = () => {
    if (pathname === 'quest') {
      const data = { questId: dataId, questType: dataType };

      dispatch(questCheck({ data, navigate }));
      dispatch(questSlice.actions.questCheck(data));
    } else if (pathname === 'boss') {
      const data = { bossId: dataId, bossType: dataType };

      dispatch(bossCheckToServer({ data, navigate }));
      dispatch(bossSlice.actions.bossCheckReducer(data));
    }
  };

  return (
    <>
      <td key={index} onClick={handleCheck}>
        <button>
          {data[pathname][dataType] ? (
            <CheckBoxIcon style={{ color: '#3498db' }} />
          ) : (
            <CheckBoxOutlineBlankIcon style={{ color: '#fff' }} />
          )}
        </button>
      </td>
    </>
  );
};

export default TableTd;
