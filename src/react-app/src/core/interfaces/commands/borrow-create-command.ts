import BorrowInfo from "../info/borrow-info";

export default interface BorrowCreateCommand extends BorrowInfo {
  commandId?: string;
}