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
import TableBtn from '../components/table/TableBtn';

const Boss = () => {
  const dispatch = useDispatch();

  const { bossData, errorMessage } = useSelector((state) => state.boss);
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
      <TableWrapper>
        <TableContainer component={Paper}>
          <TableBtn page="boss" />
          <Table
            stickyHeader
            aria-label="boss table"
            sx={{ backgroundColor: '#222' }}
          >
            <TableHead>
              <TableTitle ids={ids} data={bossData} type="boss" />
            </TableHead>
            <TableBody>
              <BossTable ids={ids} data={bossData} />
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>

      <AddModal
        page="boss"
        isAddModalOpen={isAddModalOpen}
        errorMessage={errorMessage}
      />
      <DelConfirmModal page="todo" isDelModalOpen={isDelModalOpen} />
      <UpdateModal page="todo" isUpdateModalOpen={isUpdateModalOpen} />
    </>
  );
};

export default Boss;
