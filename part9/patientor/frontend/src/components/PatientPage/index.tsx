import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";

import { Diagnosis, Entry, EntryType, Gender, Patient } from "../../types";
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';
import EntryHealthCheck from "./EntryHealthCheck";
import EntryHospital from "./EntryHospital";
import EntryOccupationalHealthcare from "./EntryOccupationalHealthcare";

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>();

  useEffect(() => {
    if (!id) return;
    patientService
      .getById(id)
      .then(data => setPatient(data));
    diagnosisService
      .getAll()
      .then(data => setDiagnosis(data));
  }, []);

  if (!patient) return null;

  const entryStyles = {
    border: '1px black solid', 
    borderRadius: '5px', 
    padding: '5px'
  };

  const viewEntry = (entry: Entry) => {
    switch(entry.type) {
      case EntryType.HealthCheck:
        return <EntryHealthCheck entry={entry} diagnosis={diagnosis} />;
      case EntryType.Hospital:
        return <EntryHospital entry={entry} diagnosis={diagnosis} />;
      case EntryType.OccupationalHealthcare:
        return <EntryOccupationalHealthcare entry={entry} diagnosis={diagnosis} />;
      default:
        return <></>;
    }
  };

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: "0.5em" }}>
        {patient.name} {patient.gender === Gender.Male
          ? <MaleIcon />
          : <FemaleIcon />
        }
      </Typography>
      <Typography variant="body1">ssh: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <Typography variant="h6">entries</Typography>
      {patient.entries?.map(entry => 
        <div key={entry.id} style={entryStyles}>
          {viewEntry(entry)}
        </div>
      )}
      <Button variant="outlined" color="primary">Add new entry</Button>
    </div>
  );
};

export default PatientPage;