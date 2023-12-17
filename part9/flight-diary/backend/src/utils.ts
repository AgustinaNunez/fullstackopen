import { NewDiaryEntry, Weather, Visibility } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseComment = (comment: unknown): string|undefined => {
  if (!isString(comment)) {
    return 'Incorrect or missing comment';
  }
  return undefined;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string|undefined => {
  if (!isString(date) || !isDate(date)) {
    return `Incorrect date: '${date}'`;
  }
  return undefined;
};

const isWeather = (param: string): param is Weather => {
  return Object.values(Weather).map(v => v.toString()).includes(param);
};

const parseWeather = (weather: unknown): string|undefined => {
  if (!isString(weather) || !isWeather(weather)) {
    return `Incorrect weather: '${weather}'`;
  }
  return undefined;
};

const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility).map(v => v.toString()).includes(param);
};

const parseVisibility = (visibility: unknown): string|undefined => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    return `Incorrect visibility: '${visibility}'`;
  }
  return undefined;
};

const collectErrors = (object: NewDiaryEntry) => {
  const errors: string[] = [];
  
  const errorWeather = parseWeather(object.weather);
  if (errorWeather) errors.push(errorWeather);

  const errorVisibility = parseVisibility(object.visibility);
  if (errorVisibility) errors.push(errorVisibility);

  const errorDate = parseDate(object.date);
  if (errorDate) errors.push(errorDate);

  const errorComment = parseComment(object.comment);
  if (errorComment) errors.push(errorComment);

  return errors;
};

const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('comment' in object && 'date' in object && 'weather' in object && 'visibility' in object)  {
    const errors = collectErrors(object as NewDiaryEntry);
    if (errors.length > 0) {
      throw new Error(errors.join('. '));
    }
    const newEntry: NewDiaryEntry = {
      weather: object.weather as Weather,
      visibility: object.visibility as Visibility,
      date: object.date as string,
      comment: object.comment as string
    };
  
    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewDiaryEntry;