import { SFSelectInfo, SFSelectOptionInfo } from "./interfaces/sf-select-info";

export default function SFSelectInput({ id, name, value, options, onChange, issues, tour }: SFSelectInfo) {
  return (
    <div className="field" data-tg-tour={tour}>
      <label htmlFor={id} className="label">{name}</label>
      <div className="select" style={{display: "grid"}}>
        <select id={id} value={value} onChange={(e) => onChange ? onChange(e.target.value) : undefined}>
          {options.map((option: SFSelectOptionInfo) => [
            <option key={option.key} value={option.value}>{option.key}</option>
          ])}
        </select>
      </div>
      <span className="has-text-danger" style={{ fontSize: '13px' }}>{issues?.find(x => `${x.path.join('-')}` === id)?.message}</span>
    </div>
  );
}