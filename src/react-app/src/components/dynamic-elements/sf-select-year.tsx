import { memo } from "react"
import { SFNumberInputInfo } from "../form/sf-number-input";

const SFSelectYear = memo(({ id, name, value, onChange }: SFNumberInputInfo) => {
  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  };

  const createYears = () => {
    const lastAvailableYear = 2008;
    const currentYear = getCurrentYear();
    const yearList = [lastAvailableYear];

    for (let i = lastAvailableYear + 1; i < currentYear; i++) {
      yearList.push(i);
    }

    yearList.push(currentYear);

    return yearList;
  };

  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="select" style={{display: "grid"}}>
        <select id={id} value={value} onChange={(e) => onChange ? onChange(parseInt(e.target.value)) : undefined}>
          {createYears().map((year) => (
            <option key={year} defaultValue={getCurrentYear()} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  )
});

export default SFSelectYear;