import React from 'react';

import CoreGridContainer from '../../../components/_core/CoreGridContainer';
import CoreGridItem from '../../../components/_core/CoreGridItem';
import TextBox from '../../../components/_core/Inputs/TextBox';

const UserInformation = () => {
  return (
    <CoreGridContainer>
      <CoreGridItem xs={4}>
        <TextBox
          required
          id="name"
          label="Name"
          name="name"
          autoFocus
        />
        <TextBox
          required
          name="title"
          label="Title"
          type="title"
          id="title"
        />
        <TextBox
          required
          name="email"
          label="Email Address"
          type="email"
          id="email"
        />
        <TextBox
          name="phone"
          label="phone"
          type="phone"
          id="phone"
        />
      </CoreGridItem>
    </CoreGridContainer>
  )
};

export default UserInformation;