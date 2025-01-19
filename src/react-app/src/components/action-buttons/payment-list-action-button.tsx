import { useState } from "react";
import { NumberedListLeft } from "iconoir-react";
import PaymentListModal from "../../pages/saving-fund-management/borrow/modals/payment-list-modal";
import TooltipElement from "../elements/tooltip-element";

type PaymentListActionButtonParams = {
  borrowId: number;
  associateName: string;
};

export default function PaymentListActionButton({ borrowId, associateName }: PaymentListActionButtonParams) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<number>(0);

  const handleClick = (borrowId: number, show: boolean) => {
    setSelectedBorrow(borrowId);
    setShowModal(show);
  }

  return (
    <>
    <button title="Ver pagos"
      data-tooltip-id="payment-list-tooltip"
      onClick={() => handleClick(borrowId, true)}>
      <NumberedListLeft />
      <TooltipElement id="payment-list-tooltip" text="Listado de pagos" />
    </button>
    <PaymentListModal borrowId={selectedBorrow} associateName={associateName} show={showModal} onClose={() => handleClick(0, false)} />
    </>
  )
}

export type { PaymentListActionButtonParams };