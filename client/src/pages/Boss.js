import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBossData } from '../redux/async/boss';

import Header from '../components/Header';
import Layout from '../components/Layout';
import TableBtn from '../components/TableBtn';
import TableContent from '../components/table/TableContent';
import AddModal from '../components/modal/AddModal';
import UpdateModal from '../components/modal/UpdateModal';
import DelConfirmModal from '../components/modal/DelConfirmModal';
import TableTitle from '../components/table/TableTitle';
import NoContents from '../components/table/NoContents';
import Spinner from '../components/Spinner';

const Boss = () => {
  const dispatch = useDispatch();

  const {
    isFetching,
    bossData,
    isAddModalOpen,
    isUpdateModalOpen,
    isDelModalOpen,
    nickname,
    bossId,
  } = useSelector((state) => state.boss);

  const ids = Object.keys(bossData);

  useEffect(() => {
    dispatch(getBossData());
  }, []);

  return (
    <>
      <Header page="boss" />
      <Layout>
        <TableBtn type="boss" />
        {isFetching ? (
          <Spinner />
        ) : ids.length === 0 ? (
          <NoContents type="boss" />
        ) : (
          <table>
            <thead>
              <TableTitle ids={ids} data={bossData} type="boss" />
            </thead>
            <tbody>
              <TableContent ids={ids} data={bossData} />
            </tbody>
          </table>
        )}
      </Layout>
      {isAddModalOpen && <AddModal type="boss" />}
      {isUpdateModalOpen && (
        <UpdateModal type="boss" nickname={nickname} id={bossId} />
      )}
      {isDelModalOpen && (
        <DelConfirmModal type="boss" nickname={nickname} id={bossId} />
      )}
    </>
  );
};

export default Boss;
