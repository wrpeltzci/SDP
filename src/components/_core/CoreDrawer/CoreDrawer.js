import React from 'react';
import { makeStyles } from '@mui/styles';
import { Drawer } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  
}));

const CoreDrawer = ({ children, ...props}) => {
const classes = useStyles();

return (
<Drawer {...props}>
  {children}
</Drawer>
)};

export default CoreDrawer;