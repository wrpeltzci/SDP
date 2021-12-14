import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box, Avatar, Typography, CssBaseline, Checkbox, FormControlLabel, Container, Button, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import FullWidthLayout from '../../components/Layout/FullwidthLayout';
import { Copyright } from '../../components/Copyright';
import { signout } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    backgroundColor: '#ffffff',
  },
  submit: {
    margin: theme.spacing(4, 1, 3),
  },
}));

const Login = () => {
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    signout();
    history.push('/login')
  });
  
  return (
    <FullWidthLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Signed Out
          </Typography>
          kjhkjhkjh
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </FullWidthLayout>
  )
};

export default Login;