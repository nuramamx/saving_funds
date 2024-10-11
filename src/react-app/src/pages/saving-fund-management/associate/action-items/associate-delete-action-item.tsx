import { BinMinusIn } from "iconoir-react";
import { useState } from "react";
import TooltipElement from "../../../../components/elements/tooltip-element";
import ConfirmModal from "../../../../components/modals/confirm-modal";
import AppConstants from "../../../../core/constants/app-constants";
import useAuthStore from "../../../../core/stores/auth-store";
import useNotificationStore from "../../../../core/stores/notification-store";

type AssociateDeleteActionItemParams = {
  associateId: number;
  onComplete: () => void
};

export default function AssociateDeleteActionItem({ associateId, onComplete }: AssociateDeleteActionItemParams) {
  const [showModal, setShowModal] = useState(false);
  const { pushNotification } = useNotificationStore();
  const { token } = useAuthStore();

  const fetchAssociateDelete = async () => {
    try {
      const response = await fetch(`${AppConstants.apiAssociate}/${associateId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }
      
      pushNotification({ message: 'Socio inactivado con éxito.', type: 'success' });
      
      if (onComplete) onComplete();
    } catch (err: any) {
      pushNotification({ message: err, type: 'danger' });
    }
  };

  const handleClick = () => {
    setShowModal(true);
  };

  const handleResponse = async (response: boolean) => {
    if (response && associateId !== 0) await fetchAssociateDelete();

    setShowModal(false);
  };

  return (
    <>
    <button title="Abonar" 
      data-tooltip-id="associate-delete-tooltip" 
      onClick={() => handleClick()}>
      <BinMinusIn />
      <TooltipElement id="associate-delete-tooltip" text="Inactivar" />
    </button>
    <ConfirmModal show={showModal} title="Confirmar" message="¿Desea inactivar al socio?" onResponse={(v) => handleResponse(v)} />
    </>
  )
}

export type { AssociateDeleteActionItemParams };