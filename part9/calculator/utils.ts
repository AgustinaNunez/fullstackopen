export const isInvalidNumber = (n: unknown) => {
  return !n || isNaN(Number(n));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrorMessage = (error: any) => {
  const message = (error instanceof Error)
    ? error.message
    : 'Unknown error';
  return message;
};
