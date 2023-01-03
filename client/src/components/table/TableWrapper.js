import React from 'react';

import { Container } from '@mui/material';

const TableWrapper = ({ children }) => {
  return (
    <>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 10,
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default TableWrapper;
