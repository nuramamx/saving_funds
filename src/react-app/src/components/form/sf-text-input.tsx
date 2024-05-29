import { SFTextInputInfo } from "./interfaces/sf-input-info";

export default function SFTextInput({ id, name, value, readonly = false, onChange }: SFTextInputInfo) {
  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="control">
        <input id={id} className="input" type="text" placeholder={name}
          readOnly={readonly}
          value={value}
          onChange={(e) => onChange(e.target.value)} />
      </div>
    </div>
  );
}