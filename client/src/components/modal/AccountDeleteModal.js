import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
} from "@mui/material";

import theme from "../../shared/Theme";

const AccountDeleteModal = ({
  isAccountDelModalOpen,
  onClose,
  handleDeleteAccount,
}) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Dialog
          open={isAccountDelModalOpen}
          onClose={onClose}
          aria-labelledby="account delete modal"
        >
          <Box>
            <DialogTitle>회원탈퇴</DialogTitle>
            <DialogContent dividers={true}>
              <DialogContentText>
                정말 탈퇴하시겠습니까?
                <br />
                탈퇴하면 모든 데이터는 삭제됩니다.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="success" onClick={onClose}>
                취소
              </Button>
              <Button color="error" onClick={handleDeleteAccount}>
                탈퇴
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default AccountDeleteModal;
