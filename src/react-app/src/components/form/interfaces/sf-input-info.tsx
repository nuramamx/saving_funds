import { CSSProperties } from "react";
import { ZodIssue } from "zod";

type SFInputInfo = {
  id: string;
  name: string;
  display?: string;
  readonly?: boolean;
  forceUse?: boolean;
  autofocus?: boolean;
  issues?: ZodIssue[];
  onModal?: boolean;
  isSmallInput?: boolean;
  style?: CSSProperties;
  tour?: string;
  onEnter?: () => void;
}

export type { SFInputInfo }