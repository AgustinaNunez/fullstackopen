import { Typography } from "@mui/material";
import { Diagnosis, HospitalEntry } from "../../types";
import React from "react";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

type EntryHospitalProp = {
  entry: HospitalEntry;
  diagnosis: Diagnosis[] | undefined;
};
const EntryHospital: React.FC<EntryHospitalProp> = ({entry, diagnosis}) => {
  return (
    <>
      <Typography variant="body1">
        <p>{entry.date} <LocalHospitalIcon /></p>
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
      <Typography variant="body1">
        Discharge {entry.discharge.date}: {entry.discharge.criteria}
      </Typography>
      <Typography variant="body1">Diagnose by {entry.specialist}</Typography>
    </>
  );
};

export default EntryHospital;