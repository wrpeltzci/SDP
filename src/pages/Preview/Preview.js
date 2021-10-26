import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  columnA: {
    backgroundColor: '#ddd',
    border: '1px solid #444',
  },
  columnB: {
    backgroundColor: '#ddd',
    border: '1px solid #444',
  },
}));

const Preview = () => {
const classes = useStyles();

return (
<Grid container spacing={2}>
  <Grid item xs={12} md={6} className={classes.columnA}>
    Column a
  </Grid>
  <Grid item xs={12} md={6} className={classes.columnB}>
    Column b
  </Grid>
</Grid>
)};

export default Preview;