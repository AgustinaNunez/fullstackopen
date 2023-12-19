import axios from "axios";
import { Entry, EntryFormValues, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (patientId: string|undefined, object: EntryFormValues) => {
  try {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${patientId}/entries`,
      object
    );
    return data;
  } catch(error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error('Unknown error');
    }
  }
};

export default {
  getAll, 
  getById, 
  create, 
  addEntry
};

