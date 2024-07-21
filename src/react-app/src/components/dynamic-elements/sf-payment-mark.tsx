import { CheckCircle, Circle, WarningCircle, XmarkCircle } from "iconoir-react";

type SFPaymentMarkParams = {
  type: string
};

export default function SFPaymentMark({ type }: SFPaymentMarkParams) {
  const renderMark = () => {
    switch (type) {
      case 'PAGADO':
        return (
          <CheckCircle style={{color:'#27AE60'}} />
        );
      case 'PENDIENTE':
        return (
          <Circle />
        );
      case 'ATRASADO':
        return (
          <XmarkCircle style={{color:'#C0392B'}} />
        );
      case 'INCIDENCIA':
        return (
          <WarningCircle style={{color:'#F1C40F'}} />
        );
      default:
        return '';
    }
  };

  return (
    <>
      {renderMark()}
    </>
  )
}