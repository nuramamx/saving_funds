type SFTextInputInfo = {
    id: string;
    name: string;
    value: string;
    readonly?: boolean;
    onChange: (event: any) => void;
}

type SFNumberInputInfo = {
    id: string;
    name: string;
    value: number;
    onChange: (event: any) => void;
}

type SFRangeInputInfo = {
    id: string;
    name: string;
    min?: number;
    max?: number;
    value: number;
    readonly?: boolean;
    onChange: (event: any) => void;
}

type SFTextDisplayInfo = {
    id: string;
    name: string;
    value: string;
    readonly?: boolean;
    display: string
}

export type { SFTextInputInfo, SFNumberInputInfo, SFRangeInputInfo, SFTextDisplayInfo }