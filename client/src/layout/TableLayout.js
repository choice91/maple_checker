import React from 'react';
import { Container, Paper, TableContainer } from '@mui/material';

import TableBtn from '../components/desktop/table/TableBtn';

const TableLayout = ({ page, category, children }) => {
  return (
    <>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          mt: 10,
        }}
      >
        <TableBtn page={page} category={category} />
        <TableContainer
          component={Paper}
          sx={{
            mb: 10,
            maxHeight: 650,
          }}
        >
          {children}
        </TableContainer>
      </Container>
    </>
  );
};

export default TableLayout;
