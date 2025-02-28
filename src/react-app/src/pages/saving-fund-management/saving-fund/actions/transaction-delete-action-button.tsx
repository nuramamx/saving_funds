import { XmarkCircle } from "iconoir-react";
import useAuthStore from "../../../../core/stores/auth-store";
import AppConstants from "../../../../core/constants/app-constants";
import CommandResponseInfo from "../../../../core/interfaces/info/command-response-info";

type TransactionDeleteActionButtonParams = {
  id: number;
  type: string;
  onComplete: () => void;
};

export default function TransactionDeleteActionButton({ id, type, onComplete }: TransactionDeleteActionButtonParams) {
  const { user } = useAuthStore();

  const handleClick = async () => {
    try {
      const response = await fetch(`${AppConstants.api}/${type.toLowerCase().replace('-leave', '').replace('-decease', '')}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });

      if (!response.ok) {
        const error = await response.json() as CommandResponseInfo;
        alert(`${error.message}${error.data ? ' ' + error.data : ''}`);
        return;
      }

      if (onComplete) onComplete();
    } catch (err: any) {
      alert(err);
      return;
    }
  }

  return (
    <>
    {user.role === 'ADMIN' && (
      <>
        <button title="Eliminar transacción"
          onClick={() => handleClick()}>
          <XmarkCircle />
        </button>
      </>
    )}
    </>
  )
}

export type { TransactionDeleteActionButtonParams };