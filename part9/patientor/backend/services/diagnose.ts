import data from '../data/diagnoses'
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = data;

const getAll = () => {
  return diagnoses
}

export default {
  getAll
}
