import { useCallback, useEffect, useState } from "react";
import { SFRangeInputInfo } from "./interfaces/sf-input-info";

export default function SFPercentageInput({ id, name, min = 0, max = 100, value, readonly = false, issues, onChange }: SFRangeInputInfo) {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  const handleBackspaceKeypres = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") setInputValue('0');
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (isValidCurrency(newValue)) {
      setInputValue(newValue);
      
      if (onChange) onChange(parseFloat(newValue));
    }
  };

  const handleClick = () => {
    if (!readonly) setInputValue("");
  };

  const handleBlur = () => {
    const parsedValue = parseFloat(inputValue || "0");
    const formattedValue = parsedValue.toString();
    setInputValue(formattedValue);

    if (onChange) onChange(parsedValue);
  };

  const isValidCurrency = (input: string): boolean => {
    if (input === "" || input === undefined || input === null) {
      setInputValue("");
      return false;
    }

    const isNumber = /^-?\d*\.?\d{0,2}$/.test(input);
    return isNumber;
  };

  useEffect(() => {
    setInputValue(Number(value).toFixed(2).toString());
  }, [value]);

  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="field has-addons" style={{ marginBottom: 0 }}>
        <span className="control">
          <label className="button is-static">
            %
          </label>
        </span>
        <div className="control is-expanded">
          <input id={id} className="input has-text-right" type="text" placeholder={name}
            readOnly={readonly}
            value={inputValue}
            onClick={handleClick}
            onBlur={handleBlur}
            onKeyDown={handleBackspaceKeypres}
            onChange={(e) => handleChange(e)} />
        </div>
      </div>
      <span className="has-text-danger" style={{ fontSize: '13px' }}>{issues?.find(x => `${x.path.join('-')}` === id)?.message}</span>
    </div>
  );
}