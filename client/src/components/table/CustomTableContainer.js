import React from 'react';
import { Container, Paper, TableContainer } from '@mui/material';

import TableBtn from './TableBtn';

const CustomTableContainer = ({ page, children }) => {
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
        <TableBtn page={page} />
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

export default CustomTableContainer;
