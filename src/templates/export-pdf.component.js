import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import logo from './cocopath-logo.png';

import MainTemplate from './main';
import './main.css';

const ExportPdfComponent = (props) => {
  const cleanData = JSON.parse(props.location.state.data.replace(/\n/g, ""));
  
  const componentRef = useRef();
  const company = {
    logo: <img src={logo} />,
    name: "Contra Costa Pathology Associates",
    abbrev: "CoCoPATH",
    address: "399 Taylor Blvd.suite 200 Pleasant Hill, CA 94523",
    phone: "P: 925-270-3575 F: 925-270-3589",
    website: "www.cocopath.net",
  };
  const defaultValues = {
    description: 'Pap test',
    originalDiagnosisCode: 'NORMAL;',
    condition: 'cervical cancer'
  }

  return (
    <>
      <div className="ref">
        <div ref={componentRef}>
          <MainTemplate company={company} patients={cleanData} defaultValues=
          {defaultValues} />
        </div>
      </div>
      <Button component={Link} to="/" variant='text'>{'<< '}return</Button>
      <ReactToPrint
        content={() => componentRef.current}
        trigger={() => <button className="btn btn-primary" style={{ marginTop: 20, marginBottom: 20 }}>Print to PDF!</button>}
      />
    </>
  );
}

export default ExportPdfComponent;