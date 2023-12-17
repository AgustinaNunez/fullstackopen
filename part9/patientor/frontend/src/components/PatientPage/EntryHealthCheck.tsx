import { Typography } from "@mui/material";
import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import React from "react";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import FavoriteIcon from '@mui/icons-material/Favorite';

type EntryHealthCheckProp = {
  entry: HealthCheckEntry;
  diagnosis: Diagnosis[] | undefined;
};
const EntryHealthCheck: React.FC<EntryHealthCheckProp> = ({entry, diagnosis}) => {
  const ratingColor = {
    [HealthCheckRating.Healthy]: '#28B463',
    [HealthCheckRating.LowRisk]: '#D4AC0D',
    [HealthCheckRating.HighRisk]: '#CA6F1E',
    [HealthCheckRating.CriticalRisk]: '#BA4A00'
  }[entry.healthCheckRating];

  return (
    <>
      <Typography variant="body1">
        <p>{entry.date} <MonitorHeartIcon /></p>
        <i>{entry.description}</i>
        <p><FavoriteIcon sx={{color: ratingColor}}/></p>
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

export default EntryHealthCheck;