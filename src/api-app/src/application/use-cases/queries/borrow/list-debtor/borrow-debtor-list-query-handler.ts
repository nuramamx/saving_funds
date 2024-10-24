import { Paginator } from "../../../../types/paginator-type";
import CommandHandler from "../../../../../abstractions/interfaces/command-handler";
import CommandResponse from "../../../../../abstractions/interfaces/command-response";
import BorrowDebtorListQueryRepository from "../../../../../persistence/repositories/query/borrow-debtor-list-query-repository";
import GetTotalRows from "../../../../../infrastructure/util/get-total-rows";

type BorrowDebtorListQuery = Paginator & {};

export default class BorrowDebtorListQueryHandler implements CommandHandler<BorrowDebtorListQuery, CommandResponse> {
  async execute(data: BorrowDebtorListQuery): Promise<CommandResponse> {
    try {
      const repository = new BorrowDebtorListQueryRepository();
      const result = await repository.all(data);

      return { successful: true, message: 'Busqueda exitosa.', data: result, totalRows: GetTotalRows(result), type: 'success' } as CommandResponse;;
    } catch (err: any) {
      return { successful: false, message: 'Registros no localizados.', data: err.message, type: 'danger' } as CommandResponse;
    }
  }
}

export type { BorrowDebtorListQuery }