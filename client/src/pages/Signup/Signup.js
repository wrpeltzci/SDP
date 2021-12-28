import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { Box, Avatar, Typography, CssBaseline, Container, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import FullWidthLayout from '../../components/Layout/FullwidthLayout';
import { Copyright } from '../../components/Copyright';
import { signup, signin, authenticate, isAuth } from '../../actions/auth';
import CoreWizard from '../../components/_core/CoreWizard';
import CompanyInformation from './includes/CompanyInformation';
import UserInformation from './includes/UserInformation';
import CoreCard from '../../components/_core/CoreCard';
import CoreGridContainer from '../../components/_core/CoreGridContainer';
import CoreGridItem from '../../components/_core/CoreGridItem';

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
  const [fields, setFields] = useState({
    businessName: '',
    address: '',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    businessPhone: '',
    businessEmail: '',
    fax: '',
    name: '',
    email: '',
    phone: '',
    password: '',
    verifyPass: ''
  })
  const [inputError, setInputError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const classes = useStyles();
  let history = useHistory();

  const handleFieldChange = (evt) => {
    setFields({ ...fields, [evt.target.name]: evt.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setInputError(false);
    setPassError(false);
    setErrorMessage('');

    const user = { ...fields };

    if (user.password !== user.verifyPass) {
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

  const steps = [
    {
      label: 'Company Information',
      optional: false,
      Component: <CompanyInformation onChange={handleFieldChange} fields={fields} />
    },
    {
      label: 'User Information',
      optional: false,
      Component: <UserInformation onChange={handleFieldChange} fields={fields} />
    },
  ];

  return (
    <FullWidthLayout>
      <Container component="main">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <CoreGridContainer>
            <CoreGridItem xs={12}>
              <CoreCard title="Onboarding">
                <CoreWizard steps={steps} onSubmiter={onSubmit} validate={!fields.email || !fields.password || !fields.verifyPass}/>
              </CoreCard>
            </CoreGridItem>
          </CoreGridContainer>
          <Grid container>
            <Grid item xs={6}>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right' }}>
              <Link href="/login" variant="body2">
                {"Log In"}
              </Link>
            </Grid>
          </Grid>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </FullWidthLayout>
  )
};

export default Signup;