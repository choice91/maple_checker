import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
  ThemeProvider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import modalSlice from "../../../redux/slices/modalSlice";
import todoSlice from "../../../redux/slices/todoSlice";
import bossSlice from "../../../redux/slices/bossSlice";
import { swapTodo, todoCheck } from "../../../redux/async/todo";
import { bossCheck, swapBoss } from "../../../redux/async/boss";

import theme from "../../../shared/Theme";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={props.value}
          color="secondary"
        />
      </Box>
      <Box>
        <Typography variant="body2" color="secondary">
          {props.value}%
        </Typography>
      </Box>
    </Box>
  );
};

const GridCard = (props) => {
  const { id, index, maxLength, nickname, job, array, category, data } = props;

  const [expanded, setExpanded] = React.useState(false);
  const [swipeProgress, setSwipeProgress] = React.useState(0);
  const [gauge, setGauge] = React.useState(0);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    let count = 0;
    const values = Object.values(data[category]);

    values.forEach((value) => {
      if (value) {
        count += 1;
      }
    });

    setGauge(Math.round((count / values.length) * 100));
  }, [data]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenUpdateModal = () => {
    const args = { id, nickname, page: location.pathname.split("/")[1] };
    dispatch(modalSlice.actions.openUpdateModal(args));
  };

  const handleOpenDelModal = () => {
    const args = { id, nickname, page: location.pathname.split("/")[1] };
    dispatch(modalSlice.actions.openDelModal(args));
  };

  const handleSwapTodo = (args, data) => {
    dispatch(swapTodo(args));
    dispatch(todoSlice.actions.swapTodo(data));
  };

  const handleSwapBoss = (args, data) => {
    dispatch(swapBoss(args));
    dispatch(bossSlice.actions.swapBoss(data));
  };

  const handleUp = () => {
    if (index > 0) {
      const data = { index, direction: "left" };
      const args = { data, navigate };

      if (location.pathname === "/todo") {
        handleSwapTodo(args, data);
      } else if (location.pathname === "/boss") {
        handleSwapBoss(args, data);
      }
    }
  };

  const handleDown = () => {
    if (index < maxLength - 1) {
      const data = { index, direction: "right" };
      const args = { data, navigate };

      if (location.pathname === "/todo") {
        handleSwapTodo(args, data);
      } else if (location.pathname === "/boss") {
        handleSwapBoss(args, data);
      }
    }
  };

  const handleCheck = (id, category, dataType) => {
    if (location.pathname === "/todo") {
      const data = { todoId: id, todoType: dataType };
      const args = { data, navigate };
      dispatch(todoCheck(args));
      dispatch(todoSlice.actions.todoCheckReducer(data));
    } else if (location.pathname == "/boss") {
      const data = { bossId: id, category, bossType: dataType };
      const args = { data, navigate };
      dispatch(bossCheck(args));
      dispatch(bossSlice.actions.bossCheckReducer(data));
    }
  };

  const trailingActions = ({ id, dataType, category, isChecked }) => (
    <TrailingActions>
      <SwipeAction
        destructive={false}
        onClick={() => handleCheck(id, category, dataType)}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: swipeProgress < 30 ? "center" : "flex-start",
          }}
        >
          <IconButton
            sx={{
              p: 1,
              color: isChecked
                ? theme.palette.error.main
                : theme.palette.info.main,
            }}
          >
            {isChecked ? <CloseIcon /> : <CheckIcon />}
          </IconButton>
        </Box>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: theme.palette.grey["900"] }}>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: "700",
                    fontSize: 20,
                    marginRight: "0.5rem",
                  }}
                >
                  {nickname}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "500",
                    fontSize: 14,
                    color: theme.palette.grey["500"],
                  }}
                >
                  {job}
                </Typography>
              </Box>
              <Box>
                <IconButton color="primary" onClick={handleUp}>
                  <ArrowUpwardIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey["500"] }}
                  />
                </IconButton>
                <IconButton color="primary" onClick={handleDown}>
                  <ArrowDownwardIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey["500"] }}
                  />
                </IconButton>
                <IconButton color="primary" onClick={handleOpenDelModal}>
                  <DeleteIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey["500"] }}
                  />
                </IconButton>
                <IconButton color="primary" onClick={handleOpenUpdateModal}>
                  <EditIcon
                    fontSize="small"
                    sx={{ color: theme.palette.grey["500"] }}
                  />
                </IconButton>
              </Box>
            </CardContent>
            <CardActions>
              <LinearProgressWithLabel value={gauge} />
              <ExpandMore expand={expanded} onClick={handleExpandClick}>
                <ExpandMoreIcon color="primary" />
              </ExpandMore>
            </CardActions>
          </Card>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                border: "1px solid #fff",
                borderRadius: "5px",
              }}
            >
              <SwipeableList
                fullSwipe={true}
                threshold={0.3}
                type={ListType.IOS}
              >
                {Object.keys(array).map((name, index) => (
                  <SwipeableListItem
                    key={index}
                    trailingActions={trailingActions({
                      id,
                      dataType: name,
                      category,
                      isChecked: data.weekly[name],
                    })}
                    onSwipeProgress={setSwipeProgress}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "5px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        paddingLeft: "16px",
                        margin: "1px 0",
                        border: "1px solid #ff6f61",
                        fontWeight: data.weekly[name] ? 400 : 700,
                        backgroundColor: data.weekly[name]
                          ? "inherit"
                          : "#ff6f61",
                        textDecoration: data.weekly[name]
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {array[name]}
                    </Box>
                  </SwipeableListItem>
                ))}
              </SwipeableList>
            </CardContent>
          </Collapse>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default GridCard;
