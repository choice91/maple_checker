import React from 'react';
import { useDispatch } from 'react-redux';

import modalSlice from '../redux/slices/modalSlice';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const TableBtn = ({ type }) => {
  const dispatch = useDispatch();

  const openAddModal = () => {
    dispatch(modalSlice.actions.openAndCloseAddModal({ type }));
  };

  return (
    <>
      <div className="table-btn">
        <button onClick={openAddModal}>
          <PersonAddAltIcon />
          <span>캐릭터 추가</span>
        </button>
      </div>
    </>
  );
};

export default TableBtn;
