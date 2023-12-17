import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { useEffect, useState } from "react";

import { Diagnosis, Gender, Patient } from "../../types";
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';
import { Typography } from "@mui/material";

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
      {patient.entries?.map(e => 
        <div key={e.id}>
          <Typography variant="body1">
            {e.date} {e.description}
          </Typography>
          <ul>
            {e.diagnosisCodes?.map((code) => code && 
              <li key={code}>
                <Typography variant="body1">
                  {code} {diagnosis?.find(d => d.code === code)?.name}
                </Typography>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientPage;