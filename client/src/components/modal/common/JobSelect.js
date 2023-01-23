import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { jobs } from '../datas';

const useStyles = makeStyles({
  form: {
    minWidth: 80,
    '&:hover > .MuiOutlinedInput-root > .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff',
    },
    '& > .MuiFormLabel-root': {
      color: '#fff',
    },
    '& > .MuiOutlinedInput-root': {
      color: '#fff',
    },
    '& > .MuiOutlinedInput-root > .MuiOutlinedInput-notchedOutline': {
      borderColor: '#b2b2b2',
    },
    '& > .MuiOutlinedInput-root > .MuiSelect-iconOutlined': {
      color: '#fff',
    },
  },
});

const JobSelect = ({ job, onChange }) => {
  const classes = useStyles();

  return (
    <>
      <Box sx={{ pt: 1 }}>
        <FormControl fullWidth className={classes.form}>
          <InputLabel id="job">직업</InputLabel>
          <Select
            labelId="job"
            id="job-select"
            value={job}
            label="job"
            onChange={onChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: '#3f3f3f',
                  '& .MuiMenuItem-root': {
                    color: '#fff',
                  },
                  '& .MuiMenuItem-root:hover': {
                    backgroundColor: '#5f5f5f',
                  },
                  '& .Mui-selected': {
                    backgroundColor: '#4f4f4f',
                  },
                },
              },
            }}
          >
            {jobs.map((job, index) => (
              <MenuItem key={index} value={job}>
                {job}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default JobSelect;
