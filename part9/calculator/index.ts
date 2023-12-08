import express from 'express';
import { calculateBmi } from './src/bmiCalculator';
import { isInvalidNumber } from './utils';
import { ERROR } from './constants';
const app = express();

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
    const message = (error instanceof Error)
      ? error.message
      : 'Unknown error';
    return res.status(500).json({message});
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});