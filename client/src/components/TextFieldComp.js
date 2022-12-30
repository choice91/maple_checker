import React from 'react';
import { styled } from '@mui/material/styles';

import { TextField } from '@mui/material';

const CustomTextField = styled(TextField)({
  '&:hover label': {
    color: '#fff',
  },
  '& input': {
    color: '#fff',
  },
  '& label': {
    color: '#b2b2b2',
  },
  '& label.Mui-focused': {
    color: '#1976d2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#1976d2',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#b2b2b2',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2',
    },
  },
});

const TextFieldComp = ({ id, label, name, type, onChange }) => {
  return (
    <>
      <CustomTextField
        id={id}
        label={label}
        name={name}
        type={type}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
        required
        onChange={onChange}
      />
    </>
  );
};

export default TextFieldComp;
