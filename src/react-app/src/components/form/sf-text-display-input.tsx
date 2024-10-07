import { SFInputInfo } from "./interfaces/sf-input-info";

type SFTextDisplayInfo = SFInputInfo & {
  value: string | number | readonly string[] | undefined;
};

export default function SFTextDisplayInput({ id, name, value, readonly = false, display = '', issues }: SFTextDisplayInfo) {
  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="field has-addons" style={{ marginBottom: 0 }}>
        <span className="control">
          <label className="button is-static">
            {display}
          </label>
        </span>
        <div className="control is-expanded">
          <input id={id} className="input has-text-right" type="text" placeholder={name}
            readOnly={readonly}
            value={value} />
        </div>
      </div>
      <span className="has-text-danger" style={{ fontSize: '13px' }}>{issues?.find(x => `${x.path.join('-')}` === id)?.message}</span>
    </div>
  );
}