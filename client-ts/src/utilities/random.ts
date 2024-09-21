export const generateRandomNumber = (
  floor: number,
  ceiling: number,
): number => {
  if (floor >= ceiling) return 0;
  return Math.floor(Math.random() * (ceiling + 1)) + floor;
};
