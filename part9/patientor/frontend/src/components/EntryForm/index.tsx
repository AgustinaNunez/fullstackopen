import { Button, SelectChangeEvent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import diagnosisService from '../../services/diagnosis';
import patientsService from '../../services/patients';
import { Entry, EntryFormValues, EntryType } from "../../types";
import { useParams } from "react-router-dom";
import InputForm from "../BasicComponents/InputForm";
import MultipleSelect from "../BasicComponents/MultipleSelect";
import Notification from "../BasicComponents/Notification";

const EntryForm: React.FC<{entries: Entry[]}> = ({entries}) => {
  const { id } = useParams();

  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number | null>(null);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [diagnosisCodesList, setDiagnosisCodesList] = useState<string[]>([]);

  useEffect(() => {
    diagnosisService
      .getAll()
      .then(data => setDiagnosisCodesList(data.map(d => d.code)));
  }, []);

  const onChangeDiagnosis = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const resetForm = () => {
    setDate('');
    setDescription('');
    setSpecialist('');
    setDiagnosisCodes([]);
    setHealthCheckRating(null);
  };

  const onNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!healthCheckRating) return;
    const newEntry: EntryFormValues = {
      description,
      date,
      specialist,
      diagnosisCodes,
      type: EntryType.HealthCheck,
      healthCheckRating
    };
    try {
      const entry: Entry = await patientsService.addEntry(id, newEntry);
      entries.push(entry);
    } catch(error) {
      if (error && typeof error === 'object') {
        console.log(error.toString());
      } else {
        console.log(error);
      }
    }
    resetForm();
  };

  const onCancel = () => {
    resetForm();
  };

  return (
    <div style={{border: '1px solid black', padding: '0.5rem', margin: '0.5rem 0', borderRadius: '0.5rem'}}>
      <Typography variant="h6">New HealthCheck entry</Typography>
      <Notification type="error" message="mi mensaje" />
      <form onSubmit={onNewEntry}>
        <InputForm
          placeholder="Description" 
          value={description} 
          onChange={({target}) => setDescription(target.value)} 
        />
        <InputForm 
          placeholder="Date" 
          value={date} 
          type="date" 
          onChange={({target}) => setDate(target.value)} 
        />
        <InputForm
          placeholder="Specialist" 
          value={specialist} 
          onChange={({target}) => setSpecialist(target.value)} 
        />
        <MultipleSelect
          value={diagnosisCodes} 
          placeholder="Diagnosis code"
          onChange={onChangeDiagnosis}
          list={diagnosisCodesList}
        />
        <InputForm
          placeholder="Health check rating" 
          value={healthCheckRating && healthCheckRating >= 0 ? String(healthCheckRating):''} 
          onChange={({target}) => setHealthCheckRating(parseInt(target.value))} 
        />
      </form>
      <div style={{display: 'flex', gap: '0.5rem', padding: '0.5rem 0'}}>
        <Button 
          variant="contained" 
          color="error" 
          sx={{width: '6rem'}} 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{width: '6rem'}} 
          onClick={onNewEntry}
        >
          Add
        </Button>
      </div>
    </div>  
  );
};

export default EntryForm;