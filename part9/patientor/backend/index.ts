import express from 'express';
import cors from 'cors';

import diagnoseRouter from './src/routes/diagnose';
import patientRouter from './src/routes/patient';

const app = express();
app.use(cors());
app.use(express.json());

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/ping', (_req, res) => {
  res.send('pong');
});
apiRouter.use('/diagnoses', diagnoseRouter);
apiRouter.use('/patients', patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
