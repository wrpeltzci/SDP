import * as React from 'react';
import TextField from '@mui/material/TextField';

const TextBox = (props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      {...props}
    />
  );
}

export default TextBox;