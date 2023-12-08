export const isInvalidNumber = (n: unknown) => {
  return !n || isNaN(Number(n));
};
