import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getQuests } from '../redux/async/quest';

import Header from '../components/Header';
import Layout from '../components/Layout';
import TableTitle from '../components/table/TableTitle';
import TableContent from '../components/table/TableContent';

import '../css/pages/quest.scss';

const Quest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questData } = useSelector((state) => state.quest);

  const nicknames = Object.keys(questData);

  useEffect(() => {
    dispatch(getQuests({ navigate }));
  }, [dispatch]);

  return (
    <>
      <Header page="quest" />
      <Layout>
        <table>
          <thead>
            <TableTitle nicknames={nicknames} />
          </thead>
          <tbody>
            <TableContent nicknames={nicknames} quests={questData} />
          </tbody>
        </table>
      </Layout>
    </>
  );
};

export default Quest;
