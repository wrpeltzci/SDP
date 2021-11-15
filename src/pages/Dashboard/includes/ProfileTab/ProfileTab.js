import React from 'react';

import CoreGridContainer from '../../../../components/_core/CoreGridContainer';
import CoreGridItem from '../../../../components/_core/CoreGridItem';
import TextBox from '../../../../components/_core/Inputs/TextBox';
import { Divider } from '@mui/material';

const profile = [
  {
    value: "Michael Johnson",
    label: "Full Name"

  },
  {
    value: "99887766",
    label: "ID"

  },
  {
    value: "mike@email.com",
    label: "Email"

  },
  {
    value: "11223344",
    label: "Company ID"

  }
];

const ProfileTab = () => {

  return (
    <CoreGridContainer direction="column">
      <CoreGridItem md={12}>
        <h3>Profile</h3>
        <Divider />
      </CoreGridItem>
      {
        profile.map((item, key) =>
          <CoreGridItem md={12}>
            <TextBox
              label={item.label}
              value={item.value}
            />
          </CoreGridItem>
        )
      }
    </CoreGridContainer>
  )
};

export default ProfileTab;