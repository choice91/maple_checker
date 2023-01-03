import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from '@mui/material';
import TableWrapper from '../components/table/TableWrapper';

import { getBossData } from '../redux/async/boss';

import Header from '../components/Header';
import TableTitle from '../components/table/TableTitle';
import BossTable from '../components/table/BossTable';
import AddModal from '../components/modal/AddModal';
import UpdateModal from '../components/modal/UpdateModal';
import DelConfirmModal from '../components/modal/DelConfirmModal';
import NoContents from '../components/table/NoContents';
import Spinner from '../components/Spinner';

const Boss = () => {
  const dispatch = useDispatch();

  const {
    isFetching,
    bossData,
    isAddModalOpen,
    isUpdateModalOpen,
    isDelModalOpen,
    nickname,
    bossId,
  } = useSelector((state) => state.boss);

  const ids = Object.keys(bossData);

  useEffect(() => {
    dispatch(getBossData());
  }, []);

  return (
    <>
      <Header page="boss" />
      <TableWrapper>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ maxHeight: 1200 }} aria-label="boss table">
            <TableHead>
              <TableTitle ids={ids} data={bossData} type="boss" />
            </TableHead>
            <TableBody>
              <BossTable ids={ids} data={bossData} />
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </>
  );
};

export default Boss;
