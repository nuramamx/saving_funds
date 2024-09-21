import { Calendar } from 'iconoir-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/datepicker.css';
import { SFInputInfo } from './interfaces/sf-input-info';

type DatePickerInputParams = SFInputInfo & {
  value: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date: Date) => void;
}

type DatePickerInput = {
  params: DatePickerInputParams;
}

export default function SFDatePickerInput({ params }: DatePickerInput) {
  return (
    <div className="field">
      <label htmlFor={params.id} className="label">{params.name}</label>
      <div className="control">
        <DatePicker id={params.id} className="input" showIcon icon={<Calendar />} placeholderText={params.name}
          minDate={params.minDate}
          maxDate={params.maxDate}
          selected={params.value}
          dateFormat="YYYY-MM-dd"
          onChange={(e) => params.onChange ? params.onChange(e ?? new Date()) : new Date()} />
      </div>
    </div>
  );
}