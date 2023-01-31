import React from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";

import { jobs } from "../../../shared/datas";

import theme from "../../../shared/Theme";

const JobSelect = ({ job, helperText, error, onChange }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ pt: 1 }}>
          <FormControl fullWidth error={error}>
            <InputLabel id="job" color="success">
              직업
            </InputLabel>
            <Select
              labelId="job"
              id="job-select"
              value={job}
              label="job"
              color="success"
              onChange={onChange}
            >
              {jobs.map((job, index) => (
                <MenuItem key={index} value={job}>
                  {job}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default JobSelect;
