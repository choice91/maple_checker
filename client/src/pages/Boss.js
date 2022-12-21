import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBossData } from '../redux/async/boss';

import Header from '../components/Header';
import Layout from '../components/Layout';
import TableBtn from '../components/TableBtn';
import AddModal from '../components/modal/AddModal';
import DelConfirmModal from '../components/modal/DelConfirmModal';
import TableTitle from '../components/table/TableTitle';
import BossTableContent from '../components/table/BossTableContent';
import NoContents from '../components/table/NoContents';

const Boss = () => {
  const dispatch = useDispatch();

  const { bossData, isAddModalOpen } = useSelector((state) => state.boss);
  // const { isAddModalOpen, isDelModalOpen, nickname, bossId } = useSelector(
  //   (state) => state.modal
  // );

  const ids = Object.keys(bossData);

  useEffect(() => {
    dispatch(getBossData());
  }, []);

  return (
    <>
      <Header page="boss" />
      <Layout>
        <TableBtn type="boss" />
        {ids.length === 0 ? (
          <NoContents type="boss" />
        ) : (
          <table>
            <thead>
              <TableTitle ids={ids} data={bossData} type="boss" />
            </thead>
            <tbody>
              <BossTableContent ids={ids} bossData={bossData} />
            </tbody>
          </table>
        )}
      </Layout>
      {isAddModalOpen && <AddModal type="boss" />}
      {/*{isDelModalOpen && (*/}
      {/*  <DelConfirmModal type="boss" nickname={nickname} id={bossId} />*/}
      {/*)}*/}
    </>
  );
};

export default Boss;
