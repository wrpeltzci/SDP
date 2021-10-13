import React from 'react';
import './main.css';

const MainTemplate = ({ patients, company }) => {
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

            <p style={{ marginTop: 40 }}>Dear Patient,</p>

            <p>{company.name} ({company.abbrev}) had the privilege of examining your recent <span className="description">{patient.description}</span> that was performed by your clinician. At their request, we are sending this letter to inform you that the screening <span className="description">{patient.description}</span> was <span className="diagnosis">{patient.originalDiagnosisCode}</span>; there is no evidence of changes related to {patient.condition}.</p>

            <p>It is important for you to know that modern screening <span className="description">{patient.description}</span>, while excellent, does not detect all changes related to {patient.condition}s. Regular periodic testing by a healthcare provider is an important part of good gynecologic health. On rare occasions clinical judgment by your provider may override this assessment. Be sure to follow the recommendation of the clinical provider who collected this <span className="description">{patient.description}</span>, and return for your next screening test or other examination at their direction.</p>

            <p>Sincerely,</p>

            <p>{company.name}</p>
            <div id="noPrint"><hr /></div>
          </div>
        )
      }
    </>
  )
};

export default MainTemplate;