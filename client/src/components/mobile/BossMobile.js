import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";

import modalSlice from "../../redux/slices/modalSlice";
import todoSlice from "../../redux/slices/todoSlice";

import CardTitle from "./element/CardTitle";
import GridCard from "./element/GridCard";

const BossMobile = ({ weeklyArray, monthlyArray }) => {
  const dispatch = useDispatch();

  const { bossData, bossSeq, category } = useSelector((state) => state.boss);

  const openAddModal = () => {
    const args = { page: "boss" };
    dispatch(modalSlice.actions.openAddModal(args));
    dispatch(todoSlice.actions.clearTodoErrorMsg());
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          mt: 2,
          pl: 1,
          pr: 1,
        }}
      >
        <CardTitle openAddModalFn={openAddModal} />
        {bossSeq.map((seq, index) => (
          <GridCard
            id={seq}
            index={index}
            maxLength={bossSeq.length}
            nickname={bossData[seq].nickname}
            job={bossData[seq].job}
            array={category === "weekly" ? weeklyArray : monthlyArray}
            category={category}
            data={bossData[seq]}
          />
        ))}
      </Grid>
    </>
  );
};

export default BossMobile;
