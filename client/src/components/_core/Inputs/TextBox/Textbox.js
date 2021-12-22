import * as React from 'react';
import TextField from '@mui/material/TextField';

const TextBox = (props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      size="small"
      fullWidth
      {...props}
    />
  );
}

export default TextBox;