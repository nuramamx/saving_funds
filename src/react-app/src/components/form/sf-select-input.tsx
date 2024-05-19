import { SFSelectInfo, SFSelectOptionInfo } from "./interfaces/sf-select-info";

export default function SFSelectInput({ id, name, value, options, onChange }: SFSelectInfo) {
    return (
        <div className="control">
            <label className="label">{name}</label>
            <div className="select">
                <select id={id} value={value} onChange={(e) => onChange(e)}>
                    {options.map((option: SFSelectOptionInfo) => [
                        <option key={option.key} value={option.key}>{option.value}</option>
                    ])}
                </select>
            </div>
        </div>
    );
}