import { CSSProperties } from "react";
import { ZodIssue } from "zod";

type SFInputInfo = {
  id: string;
  name: string;
  display?: string;
  readonly?: boolean;
  autofocus?: boolean;
  issues?: ZodIssue[];
  onModal?: boolean;
  isSmallInput?: boolean;
  style?: CSSProperties;
  onEnter?: () => void;
}

export type { 
  SFInputInfo 
}