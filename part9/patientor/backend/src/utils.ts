import { 
  Diagnose, 
  Discharge, 
  EntryType, 
  Gender, 
  HealthCheckRating, 
  NewBaseEntryData, 
  NewEntryData, 
  NewPatientData, 
  SickLeave 
} from "./types";

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
  const strDate = parseString(date, 'date');
  if (!isDate(strDate)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return strDate;
};

const isGender = (gender: string): boolean => 
  Object.values(Gender).map(v => v.toString()).includes(gender);

const parseGender = (gender: unknown): Gender => {
  const genderStr = parseString(gender, 'gender');
  if (!isGender(genderStr)) {
    throw new Error(`Incorrect or missing gender: ${genderStr}`);
  }
  return genderStr as Gender;
};

const isHealthCheckRating = (rating: number): boolean =>
  Object.values(HealthCheckRating).includes(rating);

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  const ratingNumber = Number(rating);
  if (isNaN(ratingNumber) || !isHealthCheckRating(ratingNumber)) {
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  }
  return rating as number;
};

const isEntryType = (type: string): boolean => {
  return Object.values(EntryType).map(e => e.toString()).includes(type);
};

const parseEntryType = (type: unknown): EntryType => {
  const typeStr = parseString(type, 'type');
  if (!isEntryType(typeStr)) {
    throw new Error(`Incorrect or missing entry type: ${typeStr}`);
  }
  return typeStr as EntryType;
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
  if (!object || typeof object !== 'object') {
    return [] as Array<Diagnose['code']>;
  }
  return object as Array<Diagnose['code']>;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data: ${object}`);
  }
  if ('date' in object && 'criteria' in object) {
    const discharge = {
      date: parseDate(object.date),
      criteria: parseString(object.criteria, 'criteria'),
    };
    return discharge;
  }
  throw new Error('Some fields are missing on discharge data');
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data: ${object}`);
  }
  if ('startDate' in object && 'endDate' in object) {
    const sickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate),
    };
    return sickLeave;
  }
  throw new Error('Some fields are missing on sick leave data');
}

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
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation, 'occupation'),
      entries: []
    };
    return newPatientData;
  }
  throw new Error('Some fields are missing on new patient data');
};

export const toNewEntryData = (object: unknown): NewEntryData => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data: ${object}`);
  }
  if ('type' in object) {
    switch(object.type) {
      case EntryType.HealthCheck:
        return parseNewHealtCheckEntryData(object);
      case EntryType.Hospital:
        return parseNewHospitalEntryData(object);
      case EntryType.OccupationalHealthcare:
        return parseNewOccupationalHealthcareEntryData(object);
    }
  }
  throw new Error('Some fields are missing on new patient data');
};

export const parseBaseEntryData = (object: unknown): NewBaseEntryData => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data: ${object}`);
  }
  if ('description' in object
    && 'date' in object
    && 'specialist' in object
    && 'diagnosisCodes' in object
    && 'type' in object
  ) {
    const newBaseEntryData: NewBaseEntryData = {
      description: parseString(object.description, 'description'),
      date: parseDate(object.date),
      specialist: parseString(object.specialist, 'specialist'),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
      type: parseEntryType(object.type),
    };
    return newBaseEntryData;
  }
  throw new Error('Some fields are missing on new entry data');
};

export const parseNewHealtCheckEntryData = (object: unknown): NewEntryData => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data: ${object}`);
  }
  const newBaseEntryData = parseBaseEntryData(object);
  if ('healthCheckRating' in object) {
    const newHealthCheckEntryData: NewEntryData = {
      ...newBaseEntryData,
      type: EntryType.HealthCheck,
      healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
    };
    return newHealthCheckEntryData;
  }
  throw new Error('Some fields are missing on new health check entry data');
};

export const parseNewHospitalEntryData = (object: unknown): NewEntryData => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data: ${object}`);
  }
  const newBaseEntryData = parseBaseEntryData(object);
  if ('discharge' in object) {
    const newHospitalEntryData: NewEntryData = {
      ...newBaseEntryData,
      type: EntryType.Hospital,
      discharge: parseDischarge(object.discharge)
    };
    return newHospitalEntryData;
  }
  throw new Error('Some fields are missing on new hospital entry data');
};

export const parseNewOccupationalHealthcareEntryData = (object: unknown): NewEntryData => {
  if (!object || typeof object !== 'object') {
    throw new Error(`Incorrect or missing data: ${object}`);
  }
  const newBaseEntryData = parseBaseEntryData(object);
  if ('sickLeave' in object) {
    const newOccupationalHealthcareEntryData: NewEntryData = {
      ...newBaseEntryData,
      type: EntryType.OccupationalHealthcare,
      sickLeave: parseSickLeave(object.sickLeave)
    };
    return newOccupationalHealthcareEntryData;
  }
  throw new Error('Some fields are missing on new hospital entry data');
};
