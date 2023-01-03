import React from 'react';

import { Button } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c6d2be',
      blue: '#3498db',
    },
  },
});

const CssButton = styled(Button)(({ theme }) => ({
  '&': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    color: theme.palette.primary.blue,
  },
}));

const CustomButton = ({ text, onClick }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssButton onClick={onClick}>{text}</CssButton>
      </ThemeProvider>
    </>
  );
};

export default CustomButton;
