import express from 'express';
import patientService from '../services/patient';
import { getErrorMessage, toNewEntryData, toNewPatientData } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send(patientService.getById(id));
});
router.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    const newEntry = toNewEntryData(req.body);
    const entryAdded = patientService.addEntry(id, newEntry);
    return res.status(201).json(entryAdded);
  } catch(error) {
    return res.status(400).send(getErrorMessage(error));
  }
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