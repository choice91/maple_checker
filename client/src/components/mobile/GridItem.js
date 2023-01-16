import React from 'react';
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
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

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
  },
  icon: {
    color: '#fff',
  },
});

const GridItem = (props) => {
  const { id, nickname, dailyArray, weeklyArray, category, data } = props;
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent className={classes.cardTitle}>
            <Typography className={classes.nickname}>{nickname}</Typography>
            <Box>
              <IconButton className={classes.icon}>
                <ArrowUpwardIcon fontSize="small" />
              </IconButton>
              <IconButton className={classes.icon}>
                <ArrowDownwardIcon fontSize="small" />
              </IconButton>
              <IconButton className={classes.icon}>
                <DeleteIcon fontSize="small" />
              </IconButton>
              <IconButton className={classes.icon}>
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
            {category === 'daily'
              ? Object.keys(dailyArray).map((name, index) => (
                  <Item
                    key={index}
                    id={id}
                    name={dailyArray[name]}
                    dataType={name}
                    category={category}
                    isChecked={data.daily[name]}
                  />
                ))
              : Object.keys(weeklyArray).map((name, index) => (
                  <Item
                    key={index}
                    id={id}
                    name={weeklyArray[name]}
                    dataType={name}
                    category={category}
                    isChecked={data.weekly[name]}
                  />
                ))}
          </CardContent>
        </Collapse>
      </Grid>
    </>
  );
};

export default GridItem;
