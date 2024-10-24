import { useState } from "react";
import { ReceiveDollars } from "iconoir-react";
import TooltipElement from "../../../../components/elements/tooltip-element";
import WithdrawalCreateModal from "../modals/withdrawal-create-modal";

type WithdrawalCreateActionButtonParams = {
  savingFundId: number;
  hasActiveBorrow: boolean;
  onClose: () => void;
};

export default function WithdrawalCreateActionButton({ savingFundId, hasActiveBorrow, onClose }: WithdrawalCreateActionButtonParams) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSavingFund, setSelectedSavingFund] = useState<number>(0);

  const handleClick = (savingFundId: number, show: boolean) => {
    if (hasActiveBorrow) return;

    setSelectedSavingFund(savingFundId);
    setShowModal(show);

    if (!show && onClose) onClose();
  }

  return (
    <>
      <button title="Retirar" 
        style={{ cursor: `${!hasActiveBorrow ? 'hand' : 'not-allowed'}` }}
        data-tooltip-id="withdrawal-tooltip" 
        onClick={() => handleClick(savingFundId, true)}>
        <ReceiveDollars />
        <TooltipElement id="withdrawal-tooltip" text="Retirar" errorText={hasActiveBorrow ? 'No se pueden realizar retiros con préstamo activo.' : undefined} />
      </button>
      <WithdrawalCreateModal savingFundId={selectedSavingFund} show={showModal} onClose={() => handleClick(0, false)} />
    </>
  )
}

export type { WithdrawalCreateActionButtonParams };