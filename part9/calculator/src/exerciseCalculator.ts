import { ERROR } from "../constants";

interface ExerciseResults {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const RATING = {
  BAD: { description: 'under the target', score: 1 },
  GOOD: { description: 'not too bad but could be better', score: 2 },
  GREAT: { description: 'great!', score: 3 }
};

const calculateExercises = (target: number, hours: number[]): ExerciseResults => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(dailyHours => dailyHours > 0).length;
  const totalHours = hours.reduce((sum, value) => sum += value);
  const average = Math.round(totalHours / periodLength);
  
  const currentRating = average > target 
    ? RATING.GREAT
    : average === target
      ? RATING.GOOD
      : RATING.BAD;

  return {
    periodLength,
    trainingDays,
    success: currentRating.score > 1,
    rating: currentRating.score,
    ratingDescription: currentRating.description,
    target,
    average,
  };
};

const parseHoursArgs = (args: string[]) => {
  const params = args.slice(2);
  if (params.length < 2) throw new Error(ERROR.NOT_ENOUGH_ARGUMENTS);

  const target = Number(params[0]);
  if (isNaN(target)) {
    throw new Error(`${ERROR.PROVIDE_VALID_NUMBERS_FOR} target`);
  }

  const hours = params.slice(1).map(arg => Number(arg));
  const validHours = hours.every(hour => !isNaN(hour));
  if (!validHours) {
    throw new Error(`${ERROR.PROVIDE_VALID_NUMBERS_FOR} daily exercise hours`);
  }

  return { target, hours };
};

try {
  const { target, hours } = parseHoursArgs(process.argv);
  const result = calculateExercises(target, hours);
  console.log(result);
} catch(error) {
  const message = (error instanceof Error)
      ? error.message
      : 'Unknown error';
  console.error(`Error: ${message}.`);
}