import { useState } from "react";
import { TaskList } from "iconoir-react";
import TooltipElement from "../../../../components/elements/tooltip-element";
import TransactionListModal from "../modals/transaction-list-modal";

type TransactionListActionButtonParams = {
  savingFundId: number;
  associateName: string;
  onClose: () => void;
};

export default function TransactionListActionButton({ savingFundId, associateName, onClose }: TransactionListActionButtonParams) {
  const [showModal, setShowModal] = useState(false);
  const [selectedSavingFund, setSelectedSavingFund] = useState<number>(0);

  const handleClick = (savingFundId: number, show: boolean) => {
    setSelectedSavingFund(savingFundId);
    setShowModal(show);

    if (!show && onClose) onClose();
  }

  return (
    <>
    <button title="Transaccioones" 
      data-tooltip-id="transaction-tooltip" 
      onClick={() => handleClick(savingFundId, true)}>
      <TaskList />
      <TooltipElement id="transaction-tooltip" text="Transacciones" />
    </button>
    <TransactionListModal savingFundId={selectedSavingFund} associateName={associateName} show={showModal} onClose={() => handleClick(0, false)} />
    </>
  )
}

export type { TransactionListActionButtonParams };