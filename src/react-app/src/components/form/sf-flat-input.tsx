import { SFTextInputInfo } from "./interfaces/sf-input-info";

export default function SFFlatInput({ id, name, value, onChange }: SFTextInputInfo) {
    return (
        <div className="field">
            <label className="label">{name}</label>
            <div className="control">
                <input id={id} className="input" type="text" placeholder={name} value={value} onChange={(e) => onChange(e)} />
            </div>
        </div>
    );
}