import React from 'react';
import Grid from '@mui/material/Grid';

const CoreGridContainer = ({
  children,
  alignItems = "center",
  justifyContent = "center",
  spacing = 2,
  ...otherProps
}) => {

  return (
    <Grid container alignItems={alignItems} justifyContent={justifyContent} spacing={spacing} {...otherProps}>
      {children}
    </Grid>
  )
};

export default CoreGridContainer;