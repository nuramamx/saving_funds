import { Tooltip } from "react-tooltip";

type TooltipElementParams = {
  id: string;
  text: string;
  errorText?: string;
}

export default function TooltipElement({ id, text, errorText }: TooltipElementParams) {
  return (
    <Tooltip border={'1px solid #85929E'} opacity={100} style={{
      backgroundColor: "white",
      color: "#222",
      justifyContent: 'left',
      fontSize: '14px',
      zIndex: '999999999' }}
      id={id}>
        {text}
        {errorText !== null && errorText !== undefined && (
          <>
          <br />
          <span style={{ color:"#C0392B" }}>{errorText}</span>
          </>
        )}
        
    </Tooltip>
  )
}

export type { TooltipElementParams }