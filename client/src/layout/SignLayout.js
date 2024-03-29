import React from "react";

import { Container } from "@mui/material";

const SignLayout = ({ children }) => {
  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {children}
      </Container>
    </>
  );
};

export default SignLayout;
