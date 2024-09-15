import { useCallback } from "react";
import { SFTextInputInfo } from "./interfaces/sf-input-info";

export default function SFTextInput({ id, name, value, readonly = false, onEnter, onChange, issues }: SFTextInputInfo) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) onEnter();
  }, [onChange]);

  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="control">
        <input id={id} className="input" type="text" placeholder={name}
          readOnly={readonly}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => onChange ? onChange(e.target.value) : undefined} />
      </div>
      <span className="has-text-danger" style={{ fontSize: '13px' }}>{issues?.find(x => `${x.path.join('-')}` === id)?.message}</span>
    </div>
  );
}