import { Gender, NewPatientData } from "./types";

export const getErrorMessage = (error: unknown) => {
  const message = (error instanceof Error)
    ? error.message
    : 'Unknown error';
  return message;
};

const isString = (str: unknown): boolean => typeof str === 'string';

const parseString = (str: unknown, variableName = 'unknown'): string => {
  if (!str || !isString(str)) {
    throw new Error(`Incorrect or missing string for '${variableName}' variable: ${str}`);
  }
  return str as string;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): string => {
  const strDate = parseString(date);
  if (!isDate(strDate)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return strDate;
};

const isGender = (gender: string): boolean => 
  Object.values(Gender).map(v => v.toString()).includes(gender);

const parteGender = (gender: unknown): Gender => {
  const genderStr = parseString(gender);
  if (!isGender(genderStr)) {
    throw new Error(`Incorrect or missing gender: ${genderStr}`);
  }
  return genderStr as Gender;
};

export const toNewPatientData = (object: unknown): NewPatientData => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data: ${object}`);
  }
  if ('name' in object
    && 'dateOfBirth' in object
    && 'ssn' in object
    && 'gender' in object
    && 'occupation' in object
  ) {
    const newPatientData: NewPatientData = {
      name: parseString(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn, 'ssn'),
      gender: parteGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: []
    };
    return newPatientData;
  }
  throw new Error('Some fields are missing on new patient data');
};
