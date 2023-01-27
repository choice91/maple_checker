import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
} from '@mui/material';

import TableLayout from '../../layout/TableLayout';
import Spinner from '../Spinner';
import BossSelect from './table/BossSelect';
import TableTitle from './table/TableTitle';
import TableCheckbox from './table/TableCheckbox';
import NoContents from './table/NoContents';

import theme from '../Theme';

const BossDesktop = ({ weeklyArray, monthlyArray }) => {
  const { isFetching, bossData, bossSeq, category } = useSelector(
    (state) => state.boss
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <TableLayout page="boss" category={category}>
          <Table
            stickyHeader
            aria-label="boss table"
            sx={{ backgroundColor: theme.palette.grey['900'] }}
          >
            {isFetching ? (
              <Spinner />
            ) : bossSeq.length ? (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        backgroundColor: theme.palette.grey['900'],
                        minWidth: 90,
                        fontWeight: 700,
                        fontSize: 16,
                        left: 0,
                        zIndex: 99,
                      }}
                    >
                      <BossSelect />
                    </TableCell>
                    {bossSeq.map((bossId, index) => (
                      <TableTitle
                        key={index}
                        index={index}
                        id={bossId}
                        nickname={bossData[bossId].nickname}
                        job={bossData[bossId].job}
                        maxLength={bossSeq.length}
                        page="boss"
                      />
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category === 'weekly'
                    ? Object.keys(weeklyArray).map((key, index) => (
                        <TableRow key={index}>
                          <TableCell
                            align="center"
                            sx={{
                              backgroundColor: theme.palette.grey['900'],
                              left: 0,
                              zIndex: 10,
                              position: 'sticky',
                              cursor: 'default',
                            }}
                          >
                            {weeklyArray[key]}
                          </TableCell>
                          {bossSeq.map((seq, index) => (
                            <TableCheckbox
                              key={index}
                              id={seq}
                              category={category}
                              dataType={key}
                              isChecked={bossData[seq][category][key]}
                            />
                          ))}
                        </TableRow>
                      ))
                    : Object.keys(monthlyArray).map((key, index) => (
                        <TableRow key={index}>
                          <TableCell
                            align="center"
                            sx={{
                              backgroundColor: theme.palette.grey['900'],
                              left: 0,
                              zIndex: 99,
                              position: 'sticky',
                              cursor: 'default',
                            }}
                          >
                            {monthlyArray[key]}
                          </TableCell>
                          {bossSeq.map((seq, index) => (
                            <TableCheckbox
                              key={index}
                              id={seq}
                              category={category}
                              dataType={key}
                              isChecked={bossData[seq][category][key]}
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

export default BossDesktop;
