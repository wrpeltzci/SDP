import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button
} from '@mui/material';
import { Check } from '@mui/icons-material';

import { signup, signin, authenticate, isAuth } from '../../../actions/auth';
import CompanyInformation from './CompanyInformation';
import UserInformation from './UserInformation';

const RegistrationWizard = ({ onChange, fields }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [inputError, setInputError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let history = useHistory();

  const steps = [
    {
      label: 'Company Information',
      optional: false,
      Component: <CompanyInformation onChange={onChange} fields={fields} />
    },
    {
      label: 'User Information',
      optional: false,
      Component: <UserInformation onChange={onChange} fields={fields} />
    },
  ];

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    console.log('next')
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

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

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!steps[activeStep].optional) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((item, index) => {
          const stepProps = {};
          const labelProps = {};
          if (item.optional) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{item.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }} style={{ textAlign: 'center', paddingTop: 40, paddingBottom: 40, fontWeight: 'bold' }}>
            <Check style={{ marginTop: -4 }} /> Registration complete - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <div style={{ minHeight: 250, paddingTop: 20 }}>
            {steps[activeStep].Component}
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {steps[activeStep].optional && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={activeStep === steps.length - 1 ?
              onSubmit :
              handleNext} disabled={(activeStep === steps.length - 1)}>
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
};

export default RegistrationWizard;