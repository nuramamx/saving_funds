import { useState } from "react";
import { ReceiveDollars } from "iconoir-react";
import TooltipElement from "../../../../components/elements/tooltip-element";
import WithdrawalCreateModal from "../modals/withdrawal-create-modal";

type WithdrawalCreateActionButtonParams = {
  savingFundId: number;
  onClose: () => void;
};

export default function WithdrawalCreateActionButton({ savingFundId, onClose }: WithdrawalCreateActionButtonParams) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSavingFund, setSelectedSavingFund] = useState<number>(0);

  const handleClick = (savingFundId: number, show: boolean) => {
    setSelectedSavingFund(savingFundId);
    setShowModal(show);

    if (onClose) onClose();
  }

  return (
    <>
      <button title="Retirar" 
        data-tooltip-id="withdrawal-tooltip" 
        onClick={() => handleClick(savingFundId, true)}>
        <ReceiveDollars />
        <TooltipElement id="withdrawal-tooltip" text="Retirar" />
      </button>
      <WithdrawalCreateModal savingFundId={selectedSavingFund} show={showModal} onClose={() => handleClick(0, false)} />
    </>
  )
}

export type { WithdrawalCreateActionButtonParams };