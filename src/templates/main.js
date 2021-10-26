import { Grid } from '@mui/material';
import React from 'react';
import './main.css';

const MainTemplate = ({ patients, company, defaultValues }) => {
  const currentDate = () => {
    var today = new Date();

    return today.toLocaleDateString("en-US");
  }
  return (
    <>
      {
        patients.map((patient, key) =>
          <div className="container" key={key}>
            {
              Object.keys(company).map((objKey, index) =>
                objKey !== 'abbrev' && <p className="address" key={index}>{company[objKey]}</p>
              )
            }
            <Grid container alignItems="flex-start">
              <Grid item xs={6}>
                <Grid container direction={'column'} spacing={0}>
                  <Grid item>{patient.patientname}</Grid>
                  <Grid item>{patient.street}</Grid>
                  <Grid item>{patient.city}, {patient.cstate} {patient.zip}</Grid>
                </Grid>
              </Grid>
              <Grid item xs={6} className="alignDate">{currentDate()}</Grid>
            </Grid>

            <p style={{ marginTop: 40 }}>Dear Patient,</p>

            <p>{company.name} ({company.abbrev}) had the privilege of examining your recent <span className="description">{patient.description || defaultValues.description}</span> that was performed by your clinician. At their request, we are sending this letter to inform you that the screening <span className="description">{patient.description || defaultValues.description}</span> was <span className="diagnosis">{patient.originalDiagnosisCode || defaultValues.originalDiagnosisCode}</span> there is no evidence of changes related to {patient.condition || defaultValues.condition}.</p>

            <p>It is important for you to know that modern screening <span className="description">{patient.description || defaultValues.description}ing</span>, while excellent, does not detect all changes related to {patient.condition || defaultValues.condition}s. Regular periodic testing by a healthcare provider is an important part of good gynecologic health. On rare occasions clinical judgment by your provider may override this assessment. Be sure to follow the recommendation of the clinical provider who collected this <span className="description">{patient.description || defaultValues.description}</span>, and return for your next screening test or other examination at their direction.</p>

            <div className="closing">
              <p>Sincerely,</p>
              <p>{company.name}</p>
            </div>

            <div className="footer">
              <p className={'doctors'}>
                Medical Director Nader Shihabi M.D.,
              </p>
              <p className={'doctors'}>
                Nick Byne, M.D., Courtney Chapman, M.D., Dennis Hwang, M.D.,
              </p>
              <p className={'doctors'}>
                Barry Latner, M.D., Risha Randall, M.D.,
              </p>
              <p className={'doctors'}>
                Abha Soni, M.D., David Zlotnick, M.D.
              </p>
            </div>
            <div id="noPrint"><hr /></div>
          </div>
        )
      }
    </>
  )
};

export default MainTemplate;