import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../components/Header';
import Layout from '../components/Layout';
import TableBtn from '../components/TableBtn';
import AddModal from '../components/modal/AddModal';

const Boss = () => {
  const dispatch = useDispatch();

  const {
    isModalOpen,
    isDelModalOpen,
    isAddModalOpen,
    nickname,
    type,
    delNickname,
    questId,
    delQuestId,
  } = useSelector((state) => state.modal);

  return (
    <>
      <Header page="boss" />
      <Layout>
        <TableBtn type="boss" />
        <table>
          <thead></thead>
          <tbody></tbody>
        </table>
      </Layout>
      {isAddModalOpen && <AddModal type="boss" />}
    </>
  );
};

export default Boss;
