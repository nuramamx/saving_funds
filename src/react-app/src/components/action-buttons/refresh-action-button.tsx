import { useState } from "react";
import { Refresh } from "iconoir-react";

type RefreshActionButtonParams = {
  onClick: () => void
};

export default function RefreshActionButton({ onClick }: RefreshActionButtonParams) {
  return (
    <button className="button" style={{ fontSize: '11px', height: '27px' }} onClick={() => { if (onClick) onClick() }}><Refresh style={{ height: '11px' }} /></button>
  )
}

export type { RefreshActionButtonParams };