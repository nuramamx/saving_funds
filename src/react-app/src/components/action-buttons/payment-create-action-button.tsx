import { useState } from "react";
import { MoneySquare } from "iconoir-react";
import PaymentCreateModal from "../../pages/saving-fund-management/borrow/modals/payment-create-modal";
import useAuthStore from "../../core/stores/auth-store";

type PaymentCreateActionButtonParams = {
  borrowId: number;
  onClose: () => void;
};

export default function PaymentCreateActionButton({ borrowId, onClose }: PaymentCreateActionButtonParams) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBorrow, setSelectedBorrow] = useState<number>(0);
  const { user } = useAuthStore();

  const handleClick = (borrowId: number, show: boolean) => {
    setSelectedBorrow(borrowId);
    setShowModal(show);

    if (!show && onClose) onClose();
  };

  return (
    <>
    {user.role === 'ADMIN' && (
      <>
        <button title="Registrar pago" onClick={() => handleClick(borrowId, true)}><MoneySquare /></button>
        <PaymentCreateModal borrowId={selectedBorrow} show={showModal} onClose={() => handleClick(0, false)} />
      </>
    )}
    </>
  )
}

export type { PaymentCreateActionButtonParams };