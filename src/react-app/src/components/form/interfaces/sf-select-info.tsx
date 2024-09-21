import { SFInputInfo } from "./sf-input-info";

type SFSelectOptionInfo = {
    key: string | number;
    value: string | number | readonly string[] | undefined;
}

type SFSelectInfo = SFInputInfo & {
    value: string | number | readonly string[] | undefined;
    options: SFSelectOptionInfo[];
    onChange: (value: string) => void;
}

export type { SFSelectOptionInfo, SFSelectInfo };