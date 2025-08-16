export const formatDistance = (meters: number, decimal: number = 2): string => {
  const km = meters / 1000;
  return `${km.toFixed(decimal)} km`;
};
