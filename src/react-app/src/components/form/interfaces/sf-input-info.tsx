interface SFTextInputInfo {
    id: string;
    name: string;
    value: string;
    onChange: (event: any) => void;
}

interface SFNumberInputInfo {
    id: string;
    name: string;
    value: number;
    onChange: (event: any) => void;
}

export type { SFTextInputInfo, SFNumberInputInfo }