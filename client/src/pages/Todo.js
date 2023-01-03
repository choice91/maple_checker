import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getTodoDatas } from '../redux/async/todo';

import { makeStyles } from '@mui/styles';

import Header from '../components/Header';
import TableWrapper from '../components/table/TableWrapper';
import TableTitle from '../components/table/TableTitle';
import TodoTable from '../components/table/TodoTable';
import TableBtn from '../components/table/TableBtn';
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

const useStyles = makeStyles((theme) => ({
  table: {
    backgroundColor: '#222',
  },
}));

const Todo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { todoData } = useSelector((state) => state.todo);
  const { isAddModalOpen, isUpdateModalOpen, isDelModalOpen, nickname } =
    useSelector((state) => state.modal);

  const ids = Object.keys(todoData);

  useEffect(() => {
    dispatch(getTodoDatas({ navigate }));
  }, []);

  return (
    <>
      <Header page="todo" />
      <TableWrapper>
        <TableContainer component={Paper}>
          <TableBtn page="todo" />
          <Table stickyHeader aria-label="todo table" className={classes.table}>
            <TableHead>
              <TableTitle ids={ids} data={todoData} page="todo" />
            </TableHead>
            <TableBody>
              <TodoTable ids={ids} data={todoData} />
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>

      <AddModal page="todo" isAddModalOpen={isAddModalOpen} />
      <DelConfirmModal page="todo" isDelModalOpen={isDelModalOpen} />
    </>
  );
};

export default Todo;
