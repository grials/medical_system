export const verifiedNumber = (value) => {
  if (typeof value === 'number') {
    if (value < 10) {
      return `0${value}`;
    }
    return value.toString();
  }
  return null;
};
