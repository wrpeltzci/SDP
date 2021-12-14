import React from 'react';
import { Drawer } from '@mui/material';

const CoreDrawer = ({ children, ...props }) => {
  return (
    <Drawer {...props}>
      {children}
    </Drawer>
  )
};

export default CoreDrawer;