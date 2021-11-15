import React from 'react';
import Grid from '@mui/material/Grid';

const CoreGridItem = ({children, xs=12, md=6, ...otherProps}) => {

return (
  <Grid item xs={xs} md={md} {...otherProps}>
    {children}
  </Grid>
)};

export default CoreGridItem;