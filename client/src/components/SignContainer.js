import React from 'react';

import { Container } from '@mui/material';

const SignContainer = ({ children }) => {
  return (
    <>
      <Container component="main" maxWidth="xs" sx={{ height: '100vh' }}>
        {children}
      </Container>
    </>
  );
};

export default SignContainer;
