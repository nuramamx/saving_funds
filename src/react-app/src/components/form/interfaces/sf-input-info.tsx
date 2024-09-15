import { ZodIssue } from "zod";

type SFTextInputInfo = {
  id: string;
  name: string;
  value: string | number;
  readonly?: boolean;
  issues?: ZodIssue[];
  onEnter?: () => void;
  onChange?: (value: string) => void;
}

type SFNumberInputInfo = {
  id: string;
  name: string;
  value: number | string;
  readonly?: boolean;
  issues?: ZodIssue[];
  onChange?: (value: number) => void;
}

type SFMoneyInputInfo = {
  id: string;
  name: string;
  value: number | string;
  readonly?: boolean;
  issues?: ZodIssue[];
  onChange?: (value: number) => void;
}

type SFRangeInputInfo = {
  id: string;
  name: string;
  min?: number;
  max?: number;
  value: number;
  readonly?: boolean;
  issues?: ZodIssue[];
  onChange?: (value: any) => void;
}

type SFTextDisplayInfo = {
  id: string;
  name: string;
  value: string;
  readonly?: boolean;
  display: string;
  issues: ZodIssue[];
}

type SFFileInfo = {
  id: string;
  name: string;
  accept: string;
  readonly?: boolean;
  issues?: ZodIssue[];
  onChange?: (filename: string, file: File) => void;
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

export type { 
  SFTextInputInfo, 
  SFNumberInputInfo, 
  SFMoneyInputInfo, 
  SFRangeInputInfo, 
  SFTextDisplayInfo, 
  SFFileInfo, 
  DatePickerInput, 
  DatePickerInputParams 
}