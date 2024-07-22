import { useState } from "react";
import { NumberedListLeft } from "iconoir-react";
import PaymentListModal from "../modals/payment-list-modal";

type PaymentListActionButtonParams = {
  borrowId: number;
};

export default function PaymentListActionButton({ borrowId }: PaymentListActionButtonParams) {
  const [showPaymentList, setShowPaymentList] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<number>(0);

  const handleListPaymentClick = (borrowId: number, show: boolean) => {
    setSelectedBorrow(borrowId);
    setShowPaymentList(show);
  }

  return (
    <>
    <button title="Ver pagos" onClick={() => handleListPaymentClick(borrowId, true)}><NumberedListLeft /></button>&nbsp;&nbsp;
    <PaymentListModal borrowId={selectedBorrow} show={showPaymentList} onClose={() => handleListPaymentClick(0, false)} />
    </>
  )
}

export type { PaymentListActionButtonParams };