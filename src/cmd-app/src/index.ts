import BorrowLoader from "./loaders/borrow/borrow-loader";
import ContributionLoader from "./loaders/contribution/contribution-loader";
import PaymentLoader from "./loaders/payment/payment-loader";
import WithdrawalLoader from "./loaders/withdrawal/withdrawal-loader";

(async () => {
  // await ContributionLoader();
  // await WithdrawalLoader();
  // await BorrowLoader();
  await PaymentLoader();
})();