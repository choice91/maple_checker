import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';

import { getTodoDatas } from '../redux/async/todo';

import Header from '../components/Header';
import CustomTableContainer from '../components/table/CustomTableContainer';
import TableTitle from '../components/table/TableTitle';
import AddModal from '../components/modal/AddModal';
import DelConfirmModal from '../components/modal/DelConfirmModal';
import UpdateModal from '../components/modal/UpdateModal';
import NoContents from '../components/table/NoContents';
import Spinner from '../components/Spinner';
import TodoSelect from '../components/table/TodoSelect';
import CustomTableCell from '../components/table/CustomTableCell';
import StickyTableCell from '../components/table/StickyTableCell';
import TableCheckbox from '../components/table/TableCheckbox';

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

  const { isFetching, todoData, todoSeq, errorMessage, category } = useSelector(
    (state) => state.todo
  );
  const { isAddModalOpen, isUpdateModalOpen, isDelModalOpen } = useSelector(
    (state) => state.modal
  );

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
          {isFetching ? (
            <Spinner />
          ) : todoSeq.length ? (
            <>
              <TableHead>
                <TableRow>
                  <StickyTableCell
                    bgColor="#212121"
                    fontColor="#fff"
                    width={90}
                    minWidth={90}
                    fontWeight={700}
                    align="center"
                  >
                    <TodoSelect />
                  </StickyTableCell>
                  {todoSeq.map((todoId, index) => (
                    <TableTitle
                      key={index}
                      index={index}
                      id={todoId}
                      nickname={todoData[todoId].nickname}
                      maxLength={todoSeq.length}
                      page="todo"
                    />
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {category === 'daily'
                  ? Object.keys(dailyArray).map((key, index) => (
                      <TableRow key={index}>
                        <StickyTableCell
                          align="center"
                          bgColor="#222"
                          fontColor="#fff"
                        >
                          {dailyArray[key]}
                        </StickyTableCell>
                        {todoSeq.map((seq, index) => (
                          <TableCheckbox
                            key={index}
                            id={seq}
                            category={category}
                            dataType={key}
                            isChecked={todoData[seq][category][key]}
                          />
                        ))}
                      </TableRow>
                    ))
                  : Object.keys(weeklyArray).map((key, index) => (
                      <TableRow key={index}>
                        <StickyTableCell
                          align="center"
                          bgColor="#222"
                          fontColor="#fff"
                        >
                          {weeklyArray[key]}
                        </StickyTableCell>
                        {todoSeq.map((seq, index) => (
                          <TableCheckbox
                            key={index}
                            id={seq}
                            category={category}
                            dataType={key}
                            isChecked={todoData[seq][category][key]}
                          />
                        ))}
                      </TableRow>
                    ))}
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
