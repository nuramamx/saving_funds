import { SFRangeInputInfo } from "./interfaces/sf-input-info";
import useFormattedNumber from "../../core/hooks/use-formatted-number";
import { useCallback, useEffect } from "react";

export default function SFPercentageInput({ id, name, min = 0, max = 100, value, readonly = false, onChange }: SFRangeInputInfo) {
  const [percentage, setPercentage] = useFormattedNumber(value.toString());
  const hasChanged = percentage !== value.toString();

  const handleBackspaceKeypres = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") setPercentage('0');
  }, []);

  useEffect(() => {
    if (hasChanged) onChange(percentage);
  }, [hasChanged, onChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    
    if (value < min || value > max)
      value = 100;
    
    setPercentage(value.toString());
  };

  const handleClick = () => {
    setPercentage('0');
  }

  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="field has-addons">
        <span className="control">
          <label className="button is-static">
            %
          </label>
        </span>
        <div className="control">
          <input id={id} className="input" type="text" placeholder={name}
            readOnly={readonly}
            value={percentage}
            onClick={handleClick}
            onKeyDown={handleBackspaceKeypres}
            onChange={(e) => handleChange(e)} />
        </div>
      </div>
    </div>
  );
}