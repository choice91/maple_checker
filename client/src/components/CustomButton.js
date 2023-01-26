import React from 'react';

import { Button } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import theme from './Theme';

const CustomButton = ({ text, onClick }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Button onClick={onClick} color="secondary">
          {text}
        </Button>
      </ThemeProvider>
    </>
  );
};

export default CustomButton;
