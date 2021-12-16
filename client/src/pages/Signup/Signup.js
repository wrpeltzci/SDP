import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box, Avatar, Typography, CssBaseline, Container, Button, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import FullWidthLayout from '../../components/Layout/FullwidthLayout';
import { Copyright } from '../../components/Copyright';
import { signup, signin, authenticate, isAuth } from '../../actions/auth';
import TextBox from '../../components/_core/Inputs/TextBox';

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
  error: {
    color: '#ff0000'
  }
}));

const Signup = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [verifyPass, setVerifyPass] = useState(null);
  const [inputError, setInputError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const classes = useStyles();
  let history = useHistory();

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }
  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  }

  const handleVerifyPassChange = (evt) => {
    setVerifyPass(evt.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setInputError(false);
    setPassError(false);
    setErrorMessage('');

    const user = { email, password };

    if (password !== verifyPass) {
      return setPassError(true);
    } else {
      const signupResult = await signup(user);
      if (signupResult.status !== undefined && signupResult.status !== 422) {
        setSuccess(true);
        const authResult = await signin(user);

        if (authResult !== undefined) {
          authenticate(authResult, () => { })
          if (isAuth()) {
            history.push('/dashboard');
          }
        }
      } else {
        setErrorMessage(signupResult.data.message);
        return setInputError(true);
      };
    }
  };

  return (
    <FullWidthLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <TextBox
              required
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoFocus
              onChange={handleEmailChange}
            />
            <TextBox
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handlePasswordChange}
              error={inputError || passError}
            />
            <TextBox
              required
              name="password"
              label="Verify password"
              type="password"
              id="verifyPass"
              onChange={handleVerifyPassChange}
              error={inputError || passError}
            />
            {inputError && <label className={classes.error}>Error: {errorMessage}</label>}
            {passError && <label>Error: Passwords don't match</label>}
            {success && <label>Success! Please verify e-mail</label>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
              disabled={!email || !password || !verifyPass}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item xs={6}>
              </Grid>
              <Grid item xs={6} style={{ textAlign: 'right' }}>
                <Link href="/login" variant="body2">
                  {"Log In"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </FullWidthLayout>
  )
};

export default Signup;