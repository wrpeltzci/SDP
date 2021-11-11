import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Divider, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import CoreNavBar from '../CoreNavBar';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(2)
  },
  content: {
    flexGrow: 1
  },
  divider: {
    paddingTop: 10,
    paddingBottom: 10
  }
}));

const FullWidthLayout = ({ children, title, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CoreNavBar />
      {title && <Grid container>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{title || ''}</Typography>
        </Grid>
        <Grid xs={12} className={classes.divider}><Divider /></Grid>
      </Grid>}
      {children}
    </div>
  )
};

export default FullWidthLayout;