import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table, TableBody, TableHead, TableRow } from '@mui/material';

import { getBossData } from '../redux/async/boss';

import Header from '../components/Header';
import TableTitle from '../components/table/TableTitle';
import AddModal from '../components/modal/AddModal';
import UpdateModal from '../components/modal/UpdateModal';
import DelConfirmModal from '../components/modal/DelConfirmModal';
import NoContents from '../components/table/NoContents';
import Spinner from '../components/Spinner';
import CustomTableCell from '../components/table/CustomTableCell';
import BossSelect from '../components/table/BossSelect';
import CustomTableContainer from '../components/table/CustomTableContainer';
import TableCheckbox from '../components/table/TableCheckbox';

const weeklyArray = {
  zaqqum: '자쿰',
  magnus: '매그너스',
  hilla: '힐라',
  papulatus: '파풀라투스',
  pierre: '피에르',
  banban: '반반',
  bloodyQueen: '블러디 퀸',
  vellum: '벨룸',
  pinkBean: '핑크빈',
  cygnus: '시그너스',
  lotus: '스우',
  damian: '데미안',
  guardianAngelSlime: '가디언 엔젤 슬라임',
  lucid: '루시드',
  will: '윌',
  dusk: '더스크',
  jinHilla: '진힐라',
  darknell: '듄켈',
  seren: '세렌',
  kalos: '칼로스',
};

const monthlyArray = {
  blackMagician: '검은마법사',
};

const Boss = () => {
  const dispatch = useDispatch();

  const { isFetching, bossData, bossSeq, errorMessage, category } = useSelector(
    (state) => state.boss
  );
  const { isAddModalOpen, isUpdateModalOpen, isDelModalOpen } = useSelector(
    (state) => state.modal
  );

  const ids = Object.keys(bossData);

  useEffect(() => {
    dispatch(getBossData());
  }, []);

  return (
    <>
      <Header page="boss" />
      <CustomTableContainer page="boss">
        <Table
          stickyHeader
          aria-label="boss table"
          sx={{ backgroundColor: '#222' }}
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
                  >
                    <BossSelect />
                  </CustomTableCell>
                  {bossSeq.map((seq, index) => (
                    <TableTitle
                      key={index}
                      id={seq}
                      data={bossData[seq]}
                      page="boss"
                    />
                  ))}
                </TableRow>
                {/*<TableTitle ids={ids} data={bossData} page="boss" />*/}
              </TableHead>
              <TableBody>
                {category === 'weekly'
                  ? Object.keys(weeklyArray).map((key, index) => (
                      <TableRow key={index}>
                        <CustomTableCell
                          align="center"
                          bgColor="#222"
                          fontColor="#fff"
                        >
                          {weeklyArray[key]}
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
                {/*<BossTable ids={ids} data={bossData} />*/}
              </TableBody>
            </>
          ) : (
            <NoContents />
          )}
        </Table>
      </CustomTableContainer>

      <AddModal
        page="boss"
        isAddModalOpen={isAddModalOpen}
        errorMessage={errorMessage}
      />
      <DelConfirmModal page="boss" isDelModalOpen={isDelModalOpen} />
      <UpdateModal page="boss" isUpdateModalOpen={isUpdateModalOpen} />
    </>
  );
};

export default Boss;
