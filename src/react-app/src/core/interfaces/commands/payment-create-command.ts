import PaymentInfo from "../info/payment-info";

export default interface PaymentCreateCommand extends PaymentInfo {
  commandId?: string;
}