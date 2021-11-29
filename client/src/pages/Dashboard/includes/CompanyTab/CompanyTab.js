import React from 'react';

import CoreGridContainer from '../../../../components/_core/CoreGridContainer';
import CoreGridItem from '../../../../components/_core/CoreGridItem';
import TabTextField from '../../TabTextField';
import { Divider } from '@mui/material';

const company = [
  {
    label: "Company Name",
    value: "Apple",
  },
  {
    label: "Address",
    value: "100 Main STreet",
  },
  {
    label: "City",
    value: "San Francisco",
  },
  {
    label: "State",
    value: "CA",
  },
  {
    label: "Zip",
    value: "10412",
  },
  {
    label: "Phone",
    value: "+1123456789",
  },
  {
    label: "Fax",
    value: "1123456789",
  },
  {
    label: "Website",
    value: "www.apple.com",
  },
  {
    label: "Company ID",
    value: "11223344"
  }
];

const CompanyTab = () => {
  return (
    <CoreGridContainer direction="column">
      <CoreGridItem>
        <h3>Company Info</h3>
        <Divider />
      </CoreGridItem>
      {
        company.map((item, key) =>
          <TabTextField key={item.label} value={item.value} category="company" />
        )
      }
    </CoreGridContainer>
  )
};

export default CompanyTab;