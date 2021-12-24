import React from 'react';

import CoreGridContainer from '../../../components/_core/CoreGridContainer';
import CoreGridItem from '../../../components/_core/CoreGridItem';
import TextBox from '../../../components/_core/Inputs/TextBox';

const UserInformation = ({ onChange, ...otherProps}) => {
  return (
    <CoreGridContainer>
      <CoreGridItem xs={4}>
        <TextBox
          required
          id="name"
          label="Name"
          name="name"
          autoFocus
          onChange={onChange}
        />
        <TextBox
          required
          name="title"
          label="Title"
          type="title"
          id="title"
          onChange={onChange}
        />
        <TextBox
          name="phone"
          label="phone"
          type="phone"
          id="phone"
          onChange={onChange}
        />
        <TextBox
          required
          name="email"
          label="Email Address"
          type="email"
          id="email"
          onChange={onChange}
        />
        <TextBox
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          onChange={onChange}
        />
        <TextBox
        required
        name="verifyPass"
        label="Verify password"
        type="password"
        id="verifyPass"
        onChange={onChange}
      />
      </CoreGridItem>
    </CoreGridContainer>
  )
};

export default UserInformation;