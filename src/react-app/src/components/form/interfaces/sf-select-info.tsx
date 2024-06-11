import { SFTextInputInfo } from "./sf-input-info";

export interface SFSelectOptionInfo {
    key: string | number;
    value: string | number;
}

export interface SFSelectInfo extends SFTextInputInfo {
    options: SFSelectOptionInfo[]
}