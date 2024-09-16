import { verifiedNumber } from './verifiedNumberDate';

export const normalizeDate = (date) => {
  if (typeof date === 'string') {
    const splitToDate = date.split('-');

    if (splitToDate.length === 3) {
      const year = splitToDate[0];
      const mounth = verifiedNumber(parseInt(splitToDate[1], 10));
      const day = verifiedNumber(parseInt(splitToDate[2], 10));
      return `${year || '0000'}-${mounth || '00'}-${day || '00'}`;
    }
  }
  return null;
};
