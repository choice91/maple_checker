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

import { todoWeekly } from '../shared/datas';

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
        <TodoMobile weeklyArray={todoWeekly} />
      ) : (
        <TodoDesktop weeklyArray={todoWeekly} />
      )}

      <AddModal
        page="todo"
        isAddModalOpen={isAddModalOpen}
        errorMessage={errorMessage}
      />
      <DelConfirmModal page="todo" isDelModalOpen={isDelModalOpen} />
      <UpdateModal
        page="todo"
        isUpdateModalOpen={isUpdateModalOpen}
        errorMessage={errorMessage}
      />
    </>
  );
};

export default Todo;
