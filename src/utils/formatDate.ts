import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const formatDate = (date: Date, type: 1 | 2) => {
  if (type === 1) {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return formattedDate;
  }
  if (type === 2) {
    const formattedDate = format(date, 'yyyy. MM. dd. EEE', { locale: ko });
    return formattedDate;
  }
  return '';
};
