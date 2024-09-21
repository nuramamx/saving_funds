import { useState } from "react";
import { SFInputInfo } from "./interfaces/sf-input-info";
import { Page } from "iconoir-react";
import TooltipElement from "../elements/tooltip-element";

type SFFileInfo = SFInputInfo & {
  accept: string;
  onChange?: (filename: string, file: File) => void;
}

export default function SFFileInput({ id, name, readonly = false, accept, issues, onChange,  }: SFFileInfo) {
  const [filename, setFilename] = useState<string>(undefined!);

  const handleChange = (file: File = undefined!) => {
    if (file !== undefined && file !== null) {
      setFilename(file.name);
      if (onChange) onChange(file.name, file);
    }
  };

  return (
    <>
    <label htmlFor={id} className="label">{name}</label>
    <div className="file is-normal has-name">
      <label className="file-label">
        <input id={id} className="file-input" type="file"
          accept={accept}
          onChange={(e) => handleChange(e.target.files![0])} />
        <span className="file-cta">
          <span className="file-label"><Page /></span>
        </span>
        <span data-tooltip-id={`item-${filename}`} className="file-name">{filename ?? 'Seleccione un archivo.'}</span>
      </label>
      <TooltipElement id={`item-${filename}`} text={filename} />
      <span className="has-text-danger" style={{ marginLeft: '5px', fontSize: '13px' }}>{issues?.find(x => `${x.path[0]}-${x.path[1]}` === id)?.message}</span>
    </div>
    </>
  );
}