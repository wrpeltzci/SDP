import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Appbar = ({ title, ...otherProps }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" {...otherProps}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            style={{textAlign: "center"}}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Appbar;