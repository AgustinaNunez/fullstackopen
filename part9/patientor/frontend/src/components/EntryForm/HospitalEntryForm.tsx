import { Button, SelectChangeEvent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import diagnosisService from '../../services/diagnosis';
import patientsService from '../../services/patients';
import { Discharge, Entry, EntryFormValues, EntryType } from "../../types";
import { useParams } from "react-router-dom";
import InputForm from "../BasicComponents/InputForm";
import MultipleSelect from "../BasicComponents/MultipleSelect";
import Notification, { NotificationProps } from "../BasicComponents/Notification";

const HospitalEntryForm: React.FC<{entries: Entry[]}> = ({entries}) => {
  const { id } = useParams();
  const [notification, setNotification] = useState<NotificationProps|null>(null);

  const [description, setDescription] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [discharge, setDischarge] = useState<Discharge>({date: '', criteria: ''});

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
    setDischarge({date: '', criteria: ''});
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
      type: EntryType.Hospital,
      discharge
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
      <Typography variant="h6">New Hospital entry</Typography>
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
        <div>
          <Typography sx={{marginTop: '1rem'}} variant="body1"><b>Discharge</b></Typography>
          <InputForm 
            placeholder="Date" 
            value={discharge?.date} 
            type="date" 
            onChange={({target}) => setDischarge({...discharge, date: target.value})}
          />
          <InputForm
            placeholder="Criteria" 
            value={discharge?.criteria} 
            onChange={({target}) => setDischarge({...discharge, criteria: target.value})}
          />
        </div>
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

export default HospitalEntryForm;