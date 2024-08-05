import BorrowInfo from "../info/borrow-info";

export default interface CreateBorrowCommand extends BorrowInfo {
  commandId?: string;
}