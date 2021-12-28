import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

const CoreSpinner = ({ loading }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress size={100} style={{ margin: 'auto', color: '#FFFFFF' }} />
    </Backdrop>
  )
}

export default CoreSpinner;