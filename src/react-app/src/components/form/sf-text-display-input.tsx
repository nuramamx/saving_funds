import { SFTextDisplayInfo } from "./interfaces/sf-input-info";

export default function SFTextDisplayInput({ id, name, value, readonly = false, display = '' }: SFTextDisplayInfo) {
  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="field has-addons">
        <span className="control">
          <label className="button is-static">
            {display}
          </label>
        </span>
        <div className="control">
          <input id={id} className="input" type="text" placeholder={name}
            readOnly={readonly}
            value={value} />
        </div>
      </div>
    </div>
  );
}