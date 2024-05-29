import { SFNumberInputInfo } from "./interfaces/sf-input-info";
import useFormattedNumber from "../../core/hooks/use-formatted-number";
import { useEffect } from "react";

export default function SFMoneyInput({ id, name, value, onChange }: SFNumberInputInfo) {
    const [currency, setCurrency] = useFormattedNumber(value.toString());
    const hasChanged = currency !== value.toString();

    useEffect(() => {
      if (hasChanged) {
        onChange(parseFloat(currency));
      }
    }, [hasChanged, onChange]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrency(e.target.value);
    };

    const handleClick = () => {
      if (value.toString() === '0' || currency === '0')
        setCurrency('');
    }
  
    return (
      <div className="field">
        <label htmlFor={id} className="label">{name}</label>
        <div className="field has-addons">
          <span className="control">
            <label className="button is-static">
              $
            </label>
          </span>
          <div className="control">
            <input id={id} className="input" type="text" placeholder={name}
                value={currency}
                onClick={handleClick}
                onChange={(e) => handleChange(e)} />
          </div>
        </div>
      </div>
    );
}