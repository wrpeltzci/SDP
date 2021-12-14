import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Grid, } from '@mui/material';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  actionButtons: {
    marginLeft: 'auto',
    paddingRight: 10
  }
}));

const CoreCard = ({ children, buttonActions, cardMedia, collapseBody, ...otherProps }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      {otherProps.title && <CardHeader {...otherProps} />}
      {cardMedia && <CardMedia
        className={classes.media}
        image={cardMedia.image}
        title={cardMedia.title}
      />}
      <CardContent>
        {children}
      </CardContent>

      {buttonActions && <CardActions disableSpacing>
        {collapseBody && <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon />
        </IconButton>
        }
        <div className={classes.actionButtons}>
          <Grid container spacing={1}>
            {
              buttonActions.map((item, key) =>
                <Grid item key={key}>
                  <Button aria-label={item.label} onClick={item.action} startIcon={item.icon} {...item.buttonProps}>
                    {item.label}
                  </Button>
                </Grid>
              )
            }
          </Grid>
        </div>
      </CardActions>}

      {collapseBody && <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {collapseBody}
        </CardContent>
      </Collapse>}
    </Card>
  );
}

export default CoreCard;