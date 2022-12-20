import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBossData } from '../redux/async/boss';

import Header from '../components/Header';
import Layout from '../components/Layout';
import TableBtn from '../components/TableBtn';
import AddModal from '../components/modal/AddModal';
import TableTitle from '../components/table/TableTitle';
import BossTableContent from '../components/table/BossTableContent';

const Boss = () => {
  const dispatch = useDispatch();

  const { bossData } = useSelector((state) => state.boss);
  const { isAddModalOpen } = useSelector((state) => state.modal);

  const ids = Object.keys(bossData);

  useEffect(() => {
    dispatch(getBossData());
  }, []);

  return (
    <>
      <Header page="boss" />
      <Layout>
        <TableBtn type="boss" />
        <table>
          <thead>
            <TableTitle ids={ids} data={bossData} />
          </thead>
          <tbody>
            <BossTableContent ids={ids} bossData={bossData} />
          </tbody>
        </table>
      </Layout>
      {isAddModalOpen && <AddModal type="boss" />}
    </>
  );
};

export default Boss;
