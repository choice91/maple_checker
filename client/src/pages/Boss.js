import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

import { getBossData } from "../redux/async/boss";

import Header from "../components/Header";
import AddModal from "../components/modal/AddModal";
import UpdateModal from "../components/modal/UpdateModal";
import DelConfirmModal from "../components/modal/DelConfirmModal";
import BossDesktop from "../components/desktop/BossDesktop";
import BossMobile from "../components/mobile/BossMobile";

import { bossWeekly, bossMonthly } from "../shared/datas";

const Boss = () => {
  const dispatch = useDispatch();

  const { addState, updateState } = useSelector((state) => state.boss);
  const { isAddModalOpen, isUpdateModalOpen, isDelModalOpen } = useSelector(
    (state) => state.modal
  );

  const isMobile = useMediaQuery("(max-width: 760px)");

  React.useEffect(() => {
    dispatch(getBossData());
  }, []);

  return (
    <>
      <Header page="boss" />

      {isMobile ? (
        <BossMobile weeklyArray={bossWeekly} monthlyArray={bossMonthly} />
      ) : (
        <BossDesktop weeklyArray={bossWeekly} monthlyArray={bossMonthly} />
      )}

      <AddModal
        page="boss"
        isAddModalOpen={isAddModalOpen}
        addState={addState}
      />
      <DelConfirmModal page="boss" isDelModalOpen={isDelModalOpen} />
      <UpdateModal
        page="boss"
        isUpdateModalOpen={isUpdateModalOpen}
        updateState={updateState}
      />
    </>
  );
};

export default Boss;
