import { useDispatch } from "react-redux";

import modalSlice from "../redux/slices/modalSlice";

const useModal = () => {
  const dispatch = useDispatch();

  const handleOpenAddModal = () => {
    dispatch(modalSlice.actions.openAddModal());
  };

  const handleCloseAddModal = () => {
    dispatch(modalSlice.actions.closeAddModal());
  };

  const handleOpenUpdateModal = ({ id, nickname, job }) => {
    dispatch(modalSlice.actions.openUpdateModal({ id, nickname, job }));
  };

  const handleCloseUpdateModal = () => {
    dispatch(modalSlice.actions.closeUpdateModal());
  };

  const handleOpenDeleteModal = ({ id, nickname }) => {
    dispatch(modalSlice.actions.openDelModal({ id, nickname }));
  };

  const handleCloseDeleteModal = () => {
    dispatch(modalSlice.actions.closeDelModal());
  };

  const handleOpenAccountDelModal = () => {
    dispatch(modalSlice.actions.openAccountDelModal());
  };

  const handleCloseAccountDelModal = () => {
    dispatch(modalSlice.actions.closeAccountDelModal());
  };

  return {
    openAddModal: handleOpenAddModal,
    closeAddModal: handleCloseAddModal,
    openUpdateModal: handleOpenUpdateModal,
    closeUpdateModal: handleCloseUpdateModal,
    openDeleteModal: handleOpenDeleteModal,
    closeDeleteModal: handleCloseDeleteModal,
    openAccountDelModal: handleOpenAccountDelModal,
    closeAccountDelModal: handleCloseAccountDelModal,
  };
};

export default useModal;
