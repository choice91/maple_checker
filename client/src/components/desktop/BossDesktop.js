import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  ThemeProvider,
} from '@mui/material';

import TableLayout from '../../layout/TableLayout';
import Spinner from '../Spinner';
import CustomTableCell from './table/CustomTableCell';
import BossSelect from './table/BossSelect';
import TableTitle from './table/TableTitle';
import StickyTableCell from './table/StickyTableCell';
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
                      <BossSelect />
                    </CustomTableCell>
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
                          <StickyTableCell
                            align="center"
                            bgColor="#222"
                            fontColor="#fff"
                          >
                            {weeklyArray[key]}
                          </StickyTableCell>
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
                          <CustomTableCell
                            align="center"
                            bgColor="#222"
                            fontColor="#fff"
                          >
                            {monthlyArray[key]}
                          </CustomTableCell>
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
