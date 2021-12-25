import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box, Avatar, Typography, CssBaseline, Checkbox, FormControlLabel, Container, Button, Grid, Link, Backdrop, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import FullWidthLayout from '../../components/Layout/FullwidthLayout';
import { Copyright } from '../../components/Copyright';
import { signin, authenticate, isAuth } from '../../actions/auth';
import TextBox from '../../components/_core/Inputs/TextBox';
import CoreSpinner from '../../components/_core/CoreSpinner';

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
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  let history = useHistory();

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const user = { email, password };
    const authResult = await signin(user);

    if (authResult !== undefined) {
      authenticate(authResult, () => { })
      if (isAuth()) {
        history.push('/dashboard');
      }
    } else {
      setInputError(true);
      setLoading(false);
    };

  };

  return (
    <FullWidthLayout>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        {
          loading ? <CoreSpinner loading={loading} /> :
            <>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <form className={classes.form} noValidate>
                <TextBox
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleEmailChange}
                  error={inputError}
                />
                <TextBox
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handlePasswordChange}
                  error={inputError}
                />
                {inputError && <label>Error: email and password don't match</label>}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={onSubmit}
                  disabled={!email || !password}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs={6}>
                    <Link href="/forgot" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item xs={6} style={{ textAlign: 'right' }}>
                    <Link href="/signup" variant="body2">
                      {"Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
              <Box mt={8}>
                <Copyright />
              </Box>
            </>
        }
      </Container>
    </FullWidthLayout>
  )
};

export default Login;