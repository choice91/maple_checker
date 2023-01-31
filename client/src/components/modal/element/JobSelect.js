import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from "@mui/material";

import { jobs } from "../../../shared/datas";

import theme from "../../../shared/Theme";

const JobSelect = ({ job, onChange }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box sx={{ pt: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="job">직업</InputLabel>
            <Select
              labelId="job"
              id="job-select"
              value={job}
              label="job"
              onChange={onChange}
            >
              {jobs.map((job, index) => (
                <MenuItem key={index} value={job}>
                  {job}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default JobSelect;
