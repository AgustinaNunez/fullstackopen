export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other',
}
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}
export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}
interface Discharge {
  date: string;
  criteria: string;
}
interface SickLeave {
  startDate: string;
  endDate: string;
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}
interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'Occupational Healthcare';
  sickLeave: SickLeave;
}
export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientData = Omit<Patient, 'id'>;
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry;