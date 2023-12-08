import { ERROR } from "../constants";
import { getErrorMessage } from "../utils";

export const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / Math.pow(height, 2);
  
  if (bmi < 16) return 'Underweight (Severe thinness)';
  if (bmi < 17) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25) return 'Normal (healthy weight)';
  if (bmi < 30) return 'Obese (Class I)';
  if (bmi < 35) return 'Obese (Class II)';
  if (bmi >= 40) return 'Obese (Class III)';

  throw new Error('Invalid values provided');
};

const parseBmiArgs = (args: string[]) => {
  if (args.length < 4) throw new Error(ERROR.NOT_ENOUGH_ARGUMENTS);
  if (args.length > 4) throw new Error(ERROR.TOO_MANY_ARGUMENTS);

  const height = Number(args[2]);
  const weight = Number(args[3]);
  if (height > 0 && weight > 0) {
    return { height, weight };
  }
  throw new Error(`${ERROR.PROVIDE_VALID_NUMBERS_FOR} height and weight`);
};

try {
  const { height, weight } = parseBmiArgs(process.argv);
  const bmi = calculateBmi(height, weight);
  console.log(bmi);
} catch(error) {
  console.error(`Error: ${getErrorMessage(error)}.`);
}