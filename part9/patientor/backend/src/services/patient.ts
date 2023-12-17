import { v4 as uuid } from 'uuid';

import data from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientData, Entry, NewEntryData } from '../types';

const patients: Patient[] = data as Patient[];

const getAll = (): NonSensitivePatient[] => {
  return patients.map(({ssn: _ssn, ...nonSensitiveData}) => 
    nonSensitiveData
  );
};

const getById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const create = (newPatientData: NewPatientData): Patient => {
  const patient: Patient = {
    id: uuid(),
    ...newPatientData,
  };
  patients.push(patient);
  return patient;
};

const addEntry = (patientId: string, newEntryData: NewEntryData): Entry => {
  const entry: Entry = {
    id: uuid(),
    ...newEntryData,
  };
  const patient = patients.find(p => p.id === patientId);
  patient?.entries.push(entry);
  return entry;
};

export default {
  getAll,
  getById,
  create,
  addEntry,
};
