import React from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";

import Spinner from "../Spinner";
import TableTitle from "./table/TableTitle";
import TableCheckbox from "./table/TableCheckbox";
import NoContents from "./table/NoContents";
import TableLayout from "../../layout/TableLayout";

import theme from "../../shared/Theme";

const TodoDesktop = ({ weeklyArray }) => {
  const { isFetching, todoData, todoSeq } = useSelector((state) => state.todo);

  return (
    <>
      <ThemeProvider theme={theme}>
        <TableLayout page="todo">
          <Table
            stickyHeader
            aria-label="todo table"
            sx={{ backgroundColor: theme.palette.grey["900"] }}
          >
            {isFetching ? (
              <Spinner />
            ) : todoSeq.length ? (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: theme.palette.grey["900"],
                        width: 100,
                        minWidth: 100,
                        fontWeight: 700,
                        fontSize: 16,
                        left: 0,
                        zIndex: 99,
                        cursor: "default",
                      }}
                    >
                      아케인
                      <br />
                      주간퀘
                    </TableCell>
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
                  {Object.keys(weeklyArray).map((key, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="center"
                        sx={{
                          backgroundColor: theme.palette.grey["900"],
                          left: 0,
                          zIndex: 99,
                          position: "sticky",
                          cursor: "default",
                          fontWeight: 700,
                        }}
                      >
                        {weeklyArray[key]}
                      </TableCell>
                      {todoSeq.map((seq, index) => (
                        <TableCheckbox
                          key={index}
                          id={seq}
                          dataType={key}
                          isChecked={todoData[seq].weekly[key]}
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
      </ThemeProvider>
    </>
  );
};

export default TodoDesktop;
