import express from 'express';
const app = express();
import { calculateBmi } from './src/bmiCalculator';
import { getErrorMessage, isInvalidNumber } from './utils';
import { ERROR } from './constants';
import { calculateExercises } from './src/exerciseCalculator';

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
  try {
    const {
      weight: weightParam,
      height: heightParam
    } = req.query;
    if (isInvalidNumber(weightParam) || isInvalidNumber(heightParam)) {
      return res.status(400).send({ error: `${ERROR.PROVIDE_VALID_NUMBERS_FOR} weight and height`});
    }
    const weight = Number(weightParam);
    const height = Number(heightParam);
    return res.status(200).json({
      weight,
      height,
      bmi: calculateBmi(height, weight)
    });
  } catch(error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
});
app.get('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      target: targetParam,
      daily_exercises: hoursParam
    } = req.body;
    if (!Array.isArray(hoursParam)) {
      return res.status(400).send({ error: `${ERROR.PROVIDE_VALID_NUMBERS_FOR} hours`});
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const hours = hoursParam.map(h => Number(h));
    const isInvalidHours = hours.some((h: number) => isNaN(h));
    
    if (isInvalidNumber(targetParam) || isInvalidHours) {
      return res.status(400).send({ error: `${ERROR.PROVIDE_VALID_NUMBERS_FOR} target and hours`});
    }
    const target = Number(targetParam);
    return res.status(200).json(calculateExercises(target, hours));
  } catch(error) {
    return res.status(500).json({ error: getErrorMessage(error) });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});