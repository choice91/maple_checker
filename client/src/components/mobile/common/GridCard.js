import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
  Type as ListType,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

import modalSlice from '../../../redux/slices/modalSlice';
import todoSlice from '../../../redux/slices/todoSlice';
import bossSlice from '../../../redux/slices/bossSlice';
import { swapTodo, todoCheck } from '../../../redux/async/todo';
import { bossCheck, swapBoss } from '../../../redux/async/boss';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyles = makeStyles({
  card: {
    width: '100%',
    backgroundColor: '#333',
    color: '#fff',
  },
  nickname: {
    fontWeight: '700',
    fontSize: 20,
    marginRight: '0.5rem',
  },
  expandMoreIcon: {
    color: '#fff',
  },
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid #fff',
    borderRadius: '5px',
  },
  icon: {
    color: '#fff',
  },
  swipeItem: {
    width: '100%',
    height: '50px',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: '16px',
    margin: '1px 0',
  },
  swipeCheckButton: {
    padding: '8px',
  },
  swipeBlock: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: (props) =>
      props.swipeProgress < 30 ? 'center' : 'flex-start',
  },
});

const GridCard = (props) => {
  const { id, index, maxLength, nickname, array, category, data } = props;

  const [expanded, setExpanded] = React.useState(false);
  const [swipeProgress, setSwipeProgress] = React.useState(0);

  const classes = useStyles({ swipeProgress });
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleOpenUpdateModal = () => {
    const args = { id, nickname, page: location.pathname.split('/')[1] };
    dispatch(modalSlice.actions.openUpdateModal(args));
  };

  const handleOpenDelModal = () => {
    const args = { id, nickname, page: location.pathname.split('/')[1] };
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
      const data = { index, direction: 'left' };
      const args = { data, navigate };

      if (location.pathname === '/todo') {
        handleSwapTodo(args, data);
      } else if (location.pathname === '/boss') {
        handleSwapBoss(args, data);
      }
    }
  };

  const handleDown = () => {
    if (index < maxLength - 1) {
      const data = { index, direction: 'right' };
      const args = { data, navigate };

      if (location.pathname === '/todo') {
        handleSwapTodo(args, data);
      } else if (location.pathname === '/boss') {
        handleSwapBoss(args, data);
      }
    }
  };

  const handleCheck = (id, category, dataType) => {
    if (location.pathname === '/todo') {
      const data = { todoId: id, category, todoType: dataType };
      const args = { data, navigate };
      dispatch(todoCheck(args));
      dispatch(todoSlice.actions.todoCheckReducer(data));
    } else if (location.pathname == '/boss') {
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
        <Box className={classes.swipeBlock}>
          <IconButton
            className={classes.swipeCheckButton}
            sx={{ color: isChecked ? '#ff0000' : '#19ce60' }}
          >
            {isChecked ? <CloseIcon /> : <CheckIcon />}
          </IconButton>
        </Box>
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent className={classes.cardTitle}>
            <Typography className={classes.nickname}>{nickname}</Typography>
            <Box>
              <IconButton className={classes.icon} onClick={handleUp}>
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton className={classes.icon} onClick={handleDown}>
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
              <IconButton className={classes.icon} onClick={handleOpenDelModal}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton
                className={classes.icon}
                onClick={handleOpenUpdateModal}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          </CardContent>
          <CardActions>
            <ExpandMore expand={expanded} onClick={handleExpandClick}>
              <ExpandMoreIcon className={classes.expandMoreIcon} />
            </ExpandMore>
          </CardActions>
        </Card>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.cardContent}>
            <SwipeableList fullSwipe={true} threshold={0.3} type={ListType.IOS}>
              {Object.keys(array).map((name, index) => (
                <SwipeableListItem
                  key={index}
                  trailingActions={trailingActions({
                    id,
                    dataType: name,
                    category,
                    isChecked: data[category][name],
                  })}
                  onSwipeProgress={setSwipeProgress}
                >
                  <Box
                    className={classes.swipeItem}
                    sx={{
                      border: '1px solid #ff6f61',
                      fontWeight: data[category][name] ? 400 : 700,
                      backgroundColor: data[category][name]
                        ? 'inherit'
                        : '#ff6f61',
                      textDecoration: data[category][name]
                        ? 'line-through'
                        : 'none',
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
    </>
  );
};

export default GridCard;
