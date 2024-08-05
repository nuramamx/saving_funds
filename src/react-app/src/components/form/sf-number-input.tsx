import { SFNumberInputInfo } from "./interfaces/sf-input-info";
import { useEffect, useState } from "react";

export default function SFNumberInput({ id, name, value, readonly, onChange }: SFNumberInputInfo) {
  const [inputValue, setInputValue] = useState<string>(value.toString());

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

    const isNumber = /^-?\d*$/.test(input);
    return isNumber;
  };

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);
  
  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="field">
        <div className="control is-expanded">
          <input id={id} className="input has-text-right" type="text" placeholder={name}
            readOnly={readonly}
            value={inputValue}
            onClick={handleClick}
            onBlur={handleBlur}
            onChange={(e) => handleChange(e)} />
        </div>
      </div>
    </div>
  );
}