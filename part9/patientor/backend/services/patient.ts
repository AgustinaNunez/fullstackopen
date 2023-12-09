import patients from '../data/patients'
import { NonSensitivePatient } from '../types';

const getAll = (): NonSensitivePatient[] => {
  return patients.map(({ssn, ...nonSensitiveData}) => ({
    ...nonSensitiveData
  })) as NonSensitivePatient[]
}

export default {
  getAll
}
