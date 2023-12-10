import express from 'express';
import patientService from '../services/patient';
import { getErrorMessage, toNewPatientData } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});
router.post('/', (req, res) => {
  try {
    const newPatientData = toNewPatientData(req.body);
    const patientAdded = patientService.create(newPatientData);
    return res.status(201).send(patientAdded);
  } catch(error) {
    return res.status(400).send(getErrorMessage(error));
  }
});

export default router;