import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 300,
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default Spinner;
