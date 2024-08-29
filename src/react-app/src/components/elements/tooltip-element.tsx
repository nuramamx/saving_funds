import { Tooltip } from "react-tooltip";

type TooltipElementParams = {
  id: string;
  text: string;
}

export default function TooltipElement({ id, text }: TooltipElementParams) {
  return (
    <Tooltip border={'1px solid #85929E'} opacity={100} style={{
      backgroundColor: "white",
      color: "#222",
      justifyContent: 'left',
      fontSize: '14px',
      zIndex: '999999999' }}
      id={id}>
        {text}
    </Tooltip>
  )
}

export type { TooltipElementParams }