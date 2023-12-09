import express from 'express';
import patientService from '../services/patient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getAll());
});

export default router;