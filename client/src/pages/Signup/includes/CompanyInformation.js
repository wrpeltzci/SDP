import React from 'react';

import CoreGridContainer from '../../../components/_core/CoreGridContainer';
import CoreGridItem from '../../../components/_core/CoreGridItem';
import TextBox from '../../../components/_core/Inputs/TextBox';

const CompanyInformation = ({ onChange, fields, ...otherProps}) => {
  return (
    <CoreGridContainer>
      <CoreGridItem xs={4}>
        <TextBox
          onChange={onChange}
          required
          id="businessName"
          label="Business Name"
          name="businessName"
          autoFocus
          // error={!fields.businessName}
        />
        <TextBox
          onChange={onChange}
          required
          name="address"
          label="Address"
          type="address"
          id="address"
          // error={!fields.address}
        />
        <TextBox
          onChange={onChange}
          name="address1"
          label="Address 1"
          type="address1"
          id="address1"
        />
        <TextBox
          onChange={onChange}
          required
          name="city"
          label="City"
          type="city"
          id="city"
        />
        <TextBox
          onChange={onChange}
          required
          name="state"
          label="State"
          type="state"
          id="state"
        />
        <TextBox
          onChange={onChange}
          required
          name="postalCode"
          label="Postal Code"
          type="postalCode"
          id="postalCode"
        />
        <TextBox
          onChange={onChange}
          required
          name="businessPhone"
          label="Phone"
          type="businessPhone"
          id="businessPhone"
        />
        <TextBox
          onChange={onChange}
          name="fax"
          label="Fax"
          type="fax"
          id="fax"
        />
        <TextBox
          onChange={onChange}
          name="businessEmail"
          label="Business Email"
          type="businessEmail"
          id="businessEmail"
        />
      </CoreGridItem>
    </CoreGridContainer>
  )
};

export default CompanyInformation;