import { useState } from "react";
import { MoneySquare } from "iconoir-react";
import PaymentCreateModal from "../../pages/saving-fund-management/borrow/modals/payment-create-modal";

type PaymentCreateActionButtonParams = {
  borrowId: number;
  onClose: () => void;
};

export default function PaymentCreateActionButton({ borrowId, onClose }: PaymentCreateActionButtonParams) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<number>(0);

  const handleClick = (borrowId: number, show: boolean) => {
    setSelectedBorrow(borrowId);
    setShowModal(show);
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <>
    <button title="Registrar pago" onClick={() => handleClick(borrowId, true)}><MoneySquare /></button>&nbsp;&nbsp;
    <PaymentCreateModal borrowId={selectedBorrow} show={showModal} onClose={handleClose} />
    </>
  )
}

export type { PaymentCreateActionButtonParams };