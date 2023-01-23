import React from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableHead, TableRow } from '@mui/material';

import Spinner from '../Spinner';
import CustomTableCell from '../table/CustomTableCell';
import TodoSelect from '../table/TodoSelect';
import TableTitle from '../table/TableTitle';
import StickyTableCell from '../table/StickyTableCell';
import TableCheckbox from '../table/TableCheckbox';
import NoContents from '../table/NoContents';
import TableLayout from '../../layout/TableLayout';

const TodoDesktop = ({ dailyArray, weeklyArray }) => {
  const { isFetching, todoData, todoSeq, category } = useSelector(
    (state) => state.todo
  );

  return (
    <>
      <TableLayout page="todo" category={category}>
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
                  <CustomTableCell
                    bgColor="#212121"
                    fontColor="#fff"
                    width={90}
                    minWidth={90}
                    fontWeight={700}
                    align="center"
                    left={0}
                    zIndex={99}
                  >
                    <TodoSelect />
                  </CustomTableCell>
                  {todoSeq.map((todoId, index) => (
                    <TableTitle
                      key={index}
                      index={index}
                      id={todoId}
                      nickname={todoData[todoId].nickname}
                      job={todoData[todoId].job}
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
      </TableLayout>
    </>
  );
};

export default TodoDesktop;
