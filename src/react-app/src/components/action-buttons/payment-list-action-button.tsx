import { useState } from "react";
import { NumberedListLeft } from "iconoir-react";
import PaymentListModal from "../../pages/saving-fund-management/borrow/modals/payment-list-modal";

type PaymentListActionButtonParams = {
  borrowId: number;
};

export default function PaymentListActionButton({ borrowId }: PaymentListActionButtonParams) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<number>(0);

  const handleClick = (borrowId: number, show: boolean) => {
    setSelectedBorrow(borrowId);
    setShowModal(show);
  }

  return (
    <>
    <button title="Ver pagos" onClick={() => handleClick(borrowId, true)}><NumberedListLeft /></button>&nbsp;&nbsp;
    <PaymentListModal borrowId={selectedBorrow} show={showModal} onClose={() => handleClick(0, false)} />
    </>
  )
}

export type { PaymentListActionButtonParams };