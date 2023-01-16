import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

import { getTodoDatas } from '../redux/async/todo';

import Header from '../components/Header';
import AddModal from '../components/modal/AddModal';
import DelConfirmModal from '../components/modal/DelConfirmModal';
import UpdateModal from '../components/modal/UpdateModal';
import TodoDesktop from '../components/desktop/TodoDesktop';
import TodoMobile from '../components/mobile/TodoMobile';

const dailyArray = {
  yeoro: '여로',
  chuchu: '츄츄',
  lachelein: '레헬른',
  arcana: '아르카나',
  morass: '모라스',
  esfera: '에스페라',
  cernium: '세르니움(전)',
  burningCernium: '세르니움(후)',
  arcs: '아르크스',
  odium: '오디움',
};

const weeklyArray = {
  yeoro: '여로',
  chuchu: '츄츄',
  lachelein: '레헬른',
  arcana: '아르카나',
  morass: '모라스',
  esfera: '에스페라',
};

const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { errorMessage } = useSelector((state) => state.todo);
  const { isAddModalOpen, isUpdateModalOpen, isDelModalOpen } = useSelector(
    (state) => state.modal
  );

  const isMobile = useMediaQuery('(max-width: 760px)');

  React.useEffect(() => {
    dispatch(getTodoDatas({ navigate }));
  }, []);

  return (
    <>
      <Header page="todo" />

      {isMobile ? (
        <TodoMobile dailyArray={dailyArray} weeklyArray={weeklyArray} />
      ) : (
        <TodoDesktop dailyArray={dailyArray} weeklyArray={weeklyArray} />
      )}

      <AddModal
        page="todo"
        isAddModalOpen={isAddModalOpen}
        errorMessage={errorMessage}
      />
      <DelConfirmModal page="todo" isDelModalOpen={isDelModalOpen} />
      <UpdateModal page="todo" isUpdateModalOpen={isUpdateModalOpen} />
    </>
  );
};

export default Todo;
