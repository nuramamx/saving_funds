import { SFRangeInputInfo } from "./interfaces/sf-input-info";
import useFormattedNumber from "../../core/hooks/use-formatted-number";
import { useEffect } from "react";

export default function SFPercentageInput({ id, name, min, max, value, onChange }: SFRangeInputInfo) {
    const [percentage, setPercentage] = useFormattedNumber(value.toString());
    const hasChanged = percentage !== value.toString();

    useEffect(() => {
      if (hasChanged) {
        onChange(percentage);
      }
    }, [hasChanged, onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setPercentage(e.target.value);
    };

    const handleClick = () => {
      if (value.toString() === '0' || percentage === '0')
        setPercentage('');
    }
  
    return (
      <div className="field">
        <label htmlFor={id} className="label">{name}</label>
        <input id={id} type="range" placeholder={name} min={min} max={max}
          value={percentage}
          onClick={handleClick}
          onChange={(e) => handleChange(e)} />
        <input id={id} className="input" type="text" placeholder={name} min={min} max={max}
          readOnly={true}
          style={{ maxWidth: '80px', border: '0' }}
          value={`${percentage} %`}
          onClick={handleClick}
          onChange={(e) => handleChange(e)} />
      </div>
    );
}