import { v4 as uuid } from 'uuid';

import data from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatientData } from '../types';

const patients: Patient[] = data as Patient[];

const getAll = (): NonSensitivePatient[] => {
  return patients.map(({ssn: _ssn, ...nonSensitiveData}) => 
    nonSensitiveData
  );
};

const getById = (id: string): NonSensitivePatient | undefined => {
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

export default {
  getAll,
  getById,
  create,
};
