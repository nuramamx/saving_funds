import BorrowInfo from "../borrow-info";

export default interface CreateBorrowCommand extends BorrowInfo {
  commandId?: string;
}