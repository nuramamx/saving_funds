import { useCallback, useEffect, useRef } from "react";
import { SFInputInfo } from "./interfaces/sf-input-info";
import useAuthStore from "../../core/stores/auth-store";

type SFTextInputInfo = SFInputInfo & {
  value: string;
  onChange: (value: string) => void;
}

export default function SFTextInput({ id, name, value, readonly = false, forceUse = false, autofocus = false, onEnter, onChange, issues, onModal }: SFTextInputInfo) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onEnter) onEnter();
  }, [onChange]);

  useEffect(() => {
    if (onModal) {
      const timer = setTimeout(() => {
        if (inputRef.current && autofocus) inputRef.current.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [onModal, autofocus]);

  return (
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="control">
        <input ref={inputRef} id={id} className="input" type="text" placeholder={name}
          readOnly={user.role !== 'ADMIN' ? (forceUse ? false : true) : readonly}
          value={value}
          onKeyDown={handleKeyDown}
          onChange={(e) => onChange ? onChange(e.target.value) : undefined} />
      </div>
      <span className="has-text-danger" style={{ fontSize: '13px' }}>{issues?.find(x => `${x.path.join('-')}` === id)?.message}</span>
    </div>
  );
}

export type { SFTextInputInfo }