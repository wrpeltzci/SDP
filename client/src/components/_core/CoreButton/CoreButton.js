import React from 'react';
import Button from '@mui/material/Button';

const CoreButton = ({title, size="medium", ...otherProps}) => {
  return (
    <Button variant="outlined" size={size} {...otherProps}>
      {title}
    </Button>
  )
};

export default CoreButton;