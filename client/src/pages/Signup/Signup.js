import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box, Avatar, Typography, CssBaseline, Container, Button, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FullWidthLayout from '../../components/Layout/FullwidthLayout';
import { Copyright } from '../../components/Copyright';
import { signup } from '../../actions/auth';
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
}));

const Signup = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [verifyPass, setVerifyPass] = useState(null);
  const [inputError, setInputError] = useState(null);
  const [success, setSuccess] = useState(false);

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

    const user = { email, password };

    if (password !== verifyPass) {
      setInputError("Passwords don't match");
    } else {
      const signupResult = await signup(user);
      if (signupResult !== undefined) {
        setSuccess(true);
      } else {
        setInputError("An error occured");
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
              error={inputError}
            />
            <TextBox
              required
              name="password"
              label="Verify password"
              type="password"
              id="password"
              onChange={handleVerifyPassChange}
              error={inputError}
            />
            {inputError && <label>Error: {inputError}</label>}
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