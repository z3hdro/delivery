import { isDate, format } from 'date-fns';

const DATE_FORMAT = 'dd.MM.yyyy';

export const parseDateToInfoMap = (date: string): string => {
  if (isDate(new Date(date))) {
    return format(date, DATE_FORMAT);
  }
  return '';
};
