import React from 'react';

import CoreGridContainer from '../../../components/_core/CoreGridContainer';
import CoreGridItem from '../../../components/_core/CoreGridItem';
import TextBox from '../../../components/_core/Inputs/TextBox';

const CompanyInformation = () => {
  return (
    <CoreGridContainer>
      <CoreGridItem xs={4}>
        <TextBox
          required
          id="company"
          label="Company Name"
          name="company"
          autoFocus
        />
        <TextBox
          required
          name="address"
          label="Address"
          type="address"
          id="address"
        />
        <TextBox
          name="address1"
          label="Address 1"
          type="address1"
          id="address1"
        />
        <TextBox
          required
          name="city"
          label="City"
          type="city"
          id="city"
        />
        <TextBox
          required
          name="state"
          label="State"
          type="state"
          id="state"
        />
        <TextBox
          required
          name="postalCode"
          label="Postal Code"
          type="postalCode"
          id="postalCode"
        />
        <TextBox
          required
          name="phone"
          label="Phone"
          type="phone"
          id="phone"
        />
      </CoreGridItem>
    </CoreGridContainer>
  )
};

export default CompanyInformation;