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

export type { SFTextInputInfo, SFNumberInputInfo, SFRangeInputInfo, SFTextDisplayInfo }