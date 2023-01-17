import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { swapBoss } from '../../redux/async/boss';
import bossSlice from '../../redux/slices/bossSlice';
import modalSlice from '../../redux/slices/modalSlice';
import Item from './Item';

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
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid #fff',
    borderRadius: '5px',
  },
  icon: {
    color: '#fff',
  },
});

const BossCard = (props) => {
  const {
    id,
    nickname,
    weeklyArray,
    monthlyArray,
    category,
    data,
    index,
    maxLength,
  } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [expanded, setExpanded] = React.useState(false);

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

  const handleUp = () => {
    if (index > 0) {
      const data = { index, direction: 'left' };
      const args = { data, navigate };
      dispatch(swapBoss(args));
      dispatch(bossSlice.actions.swapBoss(data));
    }
  };

  const handleDown = () => {
    if (index < maxLength - 1) {
      const data = { index, direction: 'right' };
      const args = { data, navigate };
      dispatch(swapBoss(args));
      dispatch(bossSlice.actions.swapBoss(data));
    }
  };

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
            {category === 'weekly'
              ? Object.keys(weeklyArray).map((name, index) => (
                  <Item
                    key={index}
                    id={id}
                    name={weeklyArray[name]}
                    dataType={name}
                    category={category}
                    isChecked={data.weekly[name]}
                  />
                ))
              : Object.keys(monthlyArray).map((name, index) => (
                  <Item
                    key={index}
                    id={id}
                    name={monthlyArray[name]}
                    dataType={name}
                    category={category}
                    isChecked={data.monthly[name]}
                  />
                ))}
          </CardContent>
        </Collapse>
      </Grid>
    </>
  );
};

export default BossCard;
