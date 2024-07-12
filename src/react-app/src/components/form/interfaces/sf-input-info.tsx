import DatePicker from "react-datepicker";

type SFTextInputInfo = {
  id: string;
  name: string;
  value: string | number;
  readonly?: boolean;
  onEnter?: () => void;
  onChange?: (value: string) => void;
}

type SFNumberInputInfo = {
  id: string;
  name: string;
  value: number | string;
  readonly?: boolean;
  onChange?: (value: number) => void;
}

type SFRangeInputInfo = {
  id: string;
  name: string;
  min?: number;
  max?: number;
  value: number;
  readonly?: boolean;
  onChange?: (value: any) => void;
}

type SFTextDisplayInfo = {
  id: string;
  name: string;
  value: string;
  readonly?: boolean;
  display: string
}

type DatePickerInput = {
  params: DatePickerInputParams;
}

type DatePickerInputParams = {
  id: string;
  name: string;
  value: Date;
  readonly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onEnter?: () => void;
  onChange?: (value: Date) => void;
}

export type { SFTextInputInfo, SFNumberInputInfo, SFRangeInputInfo, SFTextDisplayInfo, DatePickerInput, DatePickerInputParams }