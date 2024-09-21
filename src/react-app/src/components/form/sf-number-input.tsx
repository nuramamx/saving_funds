import { useEffect, useState } from "react";
import { SFInputInfo } from "./interfaces/sf-input-info";

type SFNumberInputInfo = SFInputInfo & {
  value: number;
  onChange?: (value: number) => void;
}

export default function SFNumberInput({ id, name, value, readonly, isSmallInput, style, onChange }: SFNumberInputInfo) {
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
    <>
    {name == '' || name === undefined || name === null ? (
      <>
      <input
        type="text"
        id={id}
        placeholder={name}
        className={`input has-text-right ${isSmallInput ? 'is-small' : ''}`}
        style={style}
        readOnly={readonly}
        value={inputValue}
        onClick={handleClick}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e)} />
      </>
    ) : (
      <>
      <div className="field">
        <label htmlFor={id} className="label">{name}</label>
        <div className="field">
          <div className="control is-expanded">
            <input
              type="text"
              id={id}
              placeholder={name}
              className={`input has-text-right ${isSmallInput ? 'is-small' : ''}`}
              style={style}
              readOnly={readonly}
              value={inputValue}
              onClick={handleClick}
              onBlur={handleBlur}
              onChange={(e) => handleChange(e)} />
          </div>
        </div>
      </div>
      </>
    )}
    </>
  );
}

export type { SFNumberInputInfo };