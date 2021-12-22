import { Button } from '@mui/material';
import React from 'react';

import FullWidthLayout from '../../components/Layout/FullwidthLayout';
import CoreCard from '../../components/_core/CoreCard';
import CoreGridContainer from '../../components/_core/CoreGridContainer';
import CoreGridItem from '../../components/_core/CoreGridItem';
import CoreWizard from '../../components/_core/CoreWizard';
import CompanyInformation from './includes/CompanyInformation';
import UserInformation from './includes/UserInformation';

const steps = [
  {
    label: 'Company Information',
    optional: false,
    Component: <CompanyInformation />
  },
  {
    label: 'User Information',
    optional: false,
    Component: <UserInformation />
  },
];

const Register = () => {
  return (
    <FullWidthLayout title="Registration">
      <CoreGridContainer>
        <CoreGridItem>
          <CoreCard title="Onboarding">
            <CoreWizard steps={steps} />
          </CoreCard>
        </CoreGridItem>
      </CoreGridContainer>
    </FullWidthLayout>
  )
};

export default Register;