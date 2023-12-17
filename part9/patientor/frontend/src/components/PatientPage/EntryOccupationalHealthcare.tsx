import { Typography } from "@mui/material";
import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import React from "react";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

type EntryOccupationalHealthcareProp = {
  entry: OccupationalHealthcareEntry;
  diagnosis: Diagnosis[] | undefined;
};
const EntryOccupationalHealthcare: React.FC<EntryOccupationalHealthcareProp> = ({entry, diagnosis}) => {
  return (
    <>
      <Typography variant="body1">
        <p>{entry.date} <MedicalInformationIcon /> <i>{entry.employerName}</i></p>
        <i>{entry.description}</i>
      </Typography>
      <ul>
        {entry.diagnosisCodes?.map((code) => code && 
          <li key={code}>
            <Typography variant="body1">
              {code} {diagnosis?.find(d => d.code === code)?.name}
            </Typography>
          </li>
        )}
      </ul>
      <Typography variant="body1">Diagnose by {entry.specialist}</Typography>
    </>
  );
};

export default EntryOccupationalHealthcare;