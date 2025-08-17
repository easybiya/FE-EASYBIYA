import { formatDate } from '@/utils/formatDate';
import { ko } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  handleCalendar: (date: string) => void;
  currentDate: string;
}

export default function AvailableCalendar({ handleCalendar, currentDate }: Props) {
  return (
    <div className="relative left-0 top-full z-10 flex w-full items-center justify-center bg-white py-20 shadow-lg rounded">
      <DatePicker
        selected={new Date(currentDate) ? new Date(currentDate) : null}
        onChange={(e) => handleCalendar(formatDate(e!, 1))}
        minDate={new Date()}
        isClearable
        dateFormat="yyyy-MM-dd"
        inline
        locale={ko}
      />
      <style jsx>{`
        :global(.react-datepicker__header) {
          background-color: transparent !important;
          border: none !important;
        }
        :global(.react-datepicker) {
          border: none !important;
        }
        :global(.react-datepicker__day--selected),
        :global(.react-datepicker__day--keyboard-selected) {
          background-color: #23262a !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
}
