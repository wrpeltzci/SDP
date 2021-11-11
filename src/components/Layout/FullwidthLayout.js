import React from 'react';
import { makeStyles } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CoreNavBar from '../CoreNavBar';

const useStyles = makeStyles((theme) => ({
  appBarSpacer: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(2)
  },
  content: {
    flexGrow: 1
  }
}));

const FullWidthLayout = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <CoreNavBar />
      {children}
    </div>
  )
};

export default FullWidthLayout;