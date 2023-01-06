import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getTodoDatas } from '../redux/async/todo';

import Header from '../components/Header';
import CustomTableContainer from '../components/table/CustomTableContainer';
import TableTitle from '../components/table/TableTitle';
import TodoTable from '../components/table/TodoTable';
import AddModal from '../components/modal/AddModal';
import DelConfirmModal from '../components/modal/DelConfirmModal';
import UpdateModal from '../components/modal/UpdateModal';
import NoContents from '../components/table/NoContents';
import Spinner from '../components/Spinner';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from '@mui/material';

const Todo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { todoData, errorMessage } = useSelector((state) => state.todo);
  const { isAddModalOpen, isUpdateModalOpen, isDelModalOpen } = useSelector(
    (state) => state.modal
  );

  const ids = Object.keys(todoData);

  useEffect(() => {
    dispatch(getTodoDatas({ navigate }));
  }, []);

  return (
    <>
      <Header page="todo" />
      <CustomTableContainer page="todo">
        <Table
          stickyHeader
          aria-label="todo table"
          sx={{ backgroundColor: '#222' }}
        >
          {ids.length ? (
            <>
              <TableHead>
                <TableTitle ids={ids} data={todoData} page="todo" />
              </TableHead>
              <TableBody>
                <TodoTable ids={ids} data={todoData} />
              </TableBody>
            </>
          ) : (
            <NoContents />
          )}
        </Table>
      </CustomTableContainer>

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
