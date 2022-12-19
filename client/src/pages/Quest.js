import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getQuests } from '../redux/async/quest';

import Header from '../components/Header';
import Layout from '../components/Layout';
import TableTitle from '../components/table/TableTitle';
import TableContent from '../components/table/TableContent';
import UpdateModal from '../components/modal/UpdateModal';
import DelConfirmModal from '../components/modal/DelConfirmModal';
import AddModal from '../components/modal/AddModal';

import '../css/pages/quest.scss';
import TableBtn from '../components/TableBtn';

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

  useEffect(() => {
    dispatch(getQuests({ navigate }));
  }, [dispatch]);

  return (
    <>
      <Header page="quest" />
      <Layout>
        <TableBtn type="quest" />
        <table>
          <thead>
            <TableTitle ids={ids} data={questData} />
          </thead>
          <tbody>
            <TableContent ids={ids} quests={questData} />
          </tbody>
        </table>
      </Layout>
      {isModalOpen && (
        <UpdateModal type="quest" nickname={nickname} id={questId} />
      )}
      {isDelModalOpen && (
        <DelConfirmModal type="quest" nickname={delNickname} id={delQuestId} />
      )}
      {isAddModalOpen && <AddModal type="quest" />}
    </>
  );
};

export default Quest;
