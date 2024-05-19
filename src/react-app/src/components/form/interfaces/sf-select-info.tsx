import { SFTextInputInfo } from "./sf-input-info";

export interface SFSelectOptionInfo {
    key: string;
    value: string
}

export interface SFSelectInfo extends SFTextInputInfo {
    options: SFSelectOptionInfo[]
}