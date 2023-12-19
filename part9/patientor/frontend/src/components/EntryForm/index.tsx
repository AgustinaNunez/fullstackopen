import { Button, SelectChangeEvent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import diagnosisService from '../../services/diagnosis';
import patientsService from '../../services/patients';
import { Entry, EntryFormValues, EntryType, HealthCheckRating } from "../../types";
import { useParams } from "react-router-dom";
import InputForm from "../BasicComponents/InputForm";
import MultipleSelect from "../BasicComponents/MultipleSelect";
import Notification, { NotificationProps } from "../BasicComponents/Notification";
import SimpleSelect from "../BasicComponents/SimpleSelect";

const EntryForm: React.FC<{entries: Entry[]}> = ({entries}) => {
  const { id } = useParams();
  const [notification, setNotification] = useState<NotificationProps|null>(null);

  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [diagnosisCodesList, setDiagnosisCodesList] = useState<string[]>([]);
  const healthCheckRatingList = Object.entries(HealthCheckRating)
    .filter(([name, _value]) => isNaN(Number(name)))
    .map(([name, value]) => ({ value: String(value), name })
  );

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
    setHealthCheckRating('');
  };

  const notifyError = (message: string) => {
    setNotification({type: 'error', message});
    setTimeout(() => setNotification(null), 4000);
  };

  const notifySuccess = (message: string) => {
    setNotification({type: 'success', message});
    setTimeout(() => setNotification(null), 4000);
  };

  const onNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: EntryFormValues = {
      description,
      date,
      specialist,
      diagnosisCodes,
      type: EntryType.HealthCheck,
      healthCheckRating: Number(healthCheckRating)
    };
    try {
      const entry: Entry = await patientsService.addEntry(id, newEntry);
      entries.push(entry);
      notifySuccess('New entry added successfully');
    } catch(error) {
      if (error && typeof error === 'object') {
        notifyError(error.toString());
      } else {
        notifyError(String(error));
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
      {notification && <Notification type={notification.type} message={notification.message} />}
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
        <SimpleSelect
          value={healthCheckRating} 
          placeholder="Health check rating"
          onChange={({target}) => setHealthCheckRating(target.value)}
          list={healthCheckRatingList}
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