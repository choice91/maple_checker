import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  expandMoreIcon: {
    color: '#fff',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
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
        <Card className={classes.card} onClick={handleExpandClick}>
          <CardContent>
            <Typography>{nickname}</Typography>
          </CardContent>
          <CardActions>
            <ExpandMore expand={expanded}>
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
