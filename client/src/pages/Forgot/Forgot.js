import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Avatar, Typography, CssBaseline, Container, Button, Grid, Link } from '@mui/material';

import FullWidthLayout from '../../components/Layout/FullwidthLayout';
import { Copyright } from '../../components/Copyright';
import TextBox from '../../components/_core/Inputs/TextBox';
import { Info } from '@mui/icons-material';

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

const Forgot = () => {
  const [email, setEmail] = useState(null);
  const classes = useStyles();

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // const user = { email };
    // const authResult = await forgot(user);    
  };

  return (
    <FullWidthLayout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Info />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
              disabled={!email}
            >
              Request Password
            </Button>
            <Grid container>
              <Grid item xs={6}>
                <Link href="/login" variant="body2">
                  Login
                </Link>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'right'}}>
                <Link href="/register" variant="body2">
                  {"Sign Up"}
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

export default Forgot;