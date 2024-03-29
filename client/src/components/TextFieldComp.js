import React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";

import theme from "../shared/Theme";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#fff',
//       gray: '#b2b2b2',
//       blue: '#1976d2',
//       red: '#e74c3c',
//       green: '#20c997',
//     },
//   },
// });
//
// const CustomTextField = styled(TextField)(({ theme, ok }) => ({
//   '&:hover label': {
//     color: theme.palette.primary.main,
//   },
//   '& input': {
//     color: theme.palette.primary.main,
//   },
//   '& label': {
//     color: !ok ? theme.palette.primary.red : theme.palette.primary.gray,
//   },
//   '& label.Mui-focused': {
//     color: theme.palette.primary.blue,
//   },
//   '& .MuiInput-underline:after': {
//     borderBottomColor: theme.palette.primary.blue,
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: !ok ? theme.palette.primary.red : theme.palette.primary.gray,
//     },
//     '&:hover fieldset': {
//       borderColor: theme.palette.primary.main,
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: theme.palette.primary.blue,
//     },
//   },
//   '& .MuiFormHelperText-root': {
//     color: !ok ? theme.palette.primary.red : theme.palette.primary.blue,
//   },
// }));

const TextFieldComp = (props) => {
  const {
    id,
    label,
    name,
    type,
    value,
    onChange,
    onBlur,
    onKeyPress,
    helperText,
    ok,
    autoFocus,
  } = props;

  return (
    <>
      <ThemeProvider theme={theme}>
        <TextField
          id={id}
          label={label}
          name={name}
          type={type}
          defaultValue={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyPress={onKeyPress}
          helperText={helperText}
          ok={ok}
          autoFocus={autoFocus}
          margin="dense"
          variant="outlined"
          autoComplete="off"
          fullWidth
          required
          sx={{
            "& label": {
              color: ok ? theme.palette.primary.main : theme.palette.error.main,
            },
            "& label.Mui-focused": {
              color: theme.palette.success.main,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: ok
                  ? theme.palette.primary.main
                  : theme.palette.error.main,
              },
              "&.Mui-focused fieldset": {
                borderColor: theme.palette.success.main,
              },
            },
            "& .MuiFormHelperText-root": {
              color: ok ? theme.palette.primary.main : theme.palette.error.main,
            },
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default TextFieldComp;
