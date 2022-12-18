import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getQuests } from '../redux/async/quest';

import modalSlice from '../redux/slices/modalSlice';

import Header from '../components/Header';
import Layout from '../components/Layout';
import TableTitle from '../components/table/TableTitle';
import TableContent from '../components/table/TableContent';
import UpdateModal from '../components/Modal/UpdateModal';
import DelConfirmModal from '../components/Modal/DelConfirmModal';
import AddModal from '../components/Modal/AddModal';

import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import '../css/pages/quest.scss';

const Quest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questData } = useSelector((state) => state.quest);
  const {
    isModalOpen,
    isDelModalOpen,
    isAddModalOpen,
    nickname,
    delNickname,
    questId,
    delQuestId,
  } = useSelector((state) => state.modal);

  const ids = Object.keys(questData);

  const addModalOpen = () => {
    dispatch(modalSlice.actions.openAndCloseAddModal());
  };

  useEffect(() => {
    dispatch(getQuests({ navigate }));
  }, [dispatch]);

  return (
    <>
      <Header page="quest" />
      <Layout>
        <div className="table-btn">
          <button onClick={addModalOpen}>
            <PersonAddAltIcon />
            <span>캐릭터 추가</span>
          </button>
        </div>
        <table>
          <thead>
            <TableTitle ids={ids} quests={questData} />
          </thead>
          <tbody>
            <TableContent ids={ids} quests={questData} />
          </tbody>
        </table>
      </Layout>
      {isModalOpen && <UpdateModal nickname={nickname} questId={questId} />}
      {isDelModalOpen && (
        <DelConfirmModal delNickname={delNickname} delQuestId={delQuestId} />
      )}
      {isAddModalOpen && <AddModal />}
    </>
  );
};

export default Quest;
