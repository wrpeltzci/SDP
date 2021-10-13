import { Button } from '@mui/material';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';

import MainTemplate from './main';
import './main.css';

const ExportPdfComponent = () => {
  const componentRef = useRef();
  const company = {
    name: "Contra Costa Pathology Associates",
    abbrev: "CoCoPath",
    address: "399 Taylor Blvd.suite 200 Pleasant Hill, CA 94523",
    phone: "P: 925-270-3575",
    fax: "F: 925-270-3589",
    website: "W: www.cocopath.net",
  }
  const patients = [{
    "SignOutDate": "2020-09-17",
    "finalSignoutDate": "2020-09-17",
    "phys_name": "Almassi, Mehrnoosh",
    "patientName": "ACOSTA, CARMELITA",
    "dob": "1949-06-09",
    "age": "",
    "sex": "F",
    "ssn": "121-56-0026",
    "location": "",
    "street": "426 Rich Spring Drive",
    "city": "Pittsburg",
    "state": "CA",
    "zip": "94565",
    "collectionDate": "2020-09-15",
    "receivedDate": "2020-09-17",
    "number": "GYN2020-006287",
    "visitDate": "2020-09-17",
    "originalDiagnosisCode": "*NEGATIVE",
    "rescreenDiagnosisCode": "",
    "reviewDiagnosisCode": "",
    "category": "Negative",
    "result": "",
    "description": "Thinprep for Gyn/Pap specimens",
    "condition": "cervical cancer"
  },
  {
    "SignOutDate": "2020-09-18",
    "finalSignoutDate": "2020-09-18",
    "phys_name": "Almassi, Mehrnoosh",
    "patientName": "BAYAT, ANGELA",
    "dob": "1963-05-14",
    "age": "",
    "sex": "F",
    "ssn": "608-30-8615",
    "location": "",
    "street": "1547 Palos Verdes Mall #406",
    "city": "Walnut Creek",
    "state": "CA",
    "zip": "94597",
    "collectionDate": "2020-09-15",
    "receivedDate": "2020-09-17",
    "number": "GYN2020-006308",
    "visitDate": "2020-09-17",
    "originalDiagnosisCode": "*NEGATIVE",
    "rescreenDiagnosisCode": "",
    "reviewDiagnosisCode": "",
    "category": "Negative",
    "result": "Negative",
    "description": "Thinprep for Gyn/Pap specimens",
    "condition": "high blood pressure"
  }];

  return (
    <>
      <div className="ref">
        <div ref={componentRef}>
          <MainTemplate company={company} patients={patients} />
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