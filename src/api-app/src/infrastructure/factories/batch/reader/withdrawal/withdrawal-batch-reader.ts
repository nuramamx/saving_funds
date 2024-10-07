import BatchReaderInfo from "../../batch-reader-info";
import xlsx from "node-xlsx";
import BatchReaderResult from "../../batch-reader-result";
import EmptyString from "../../../../util/empty-string";

type WithdrawalBatchReaderInfo = {
  p_associate_name: string;
  p_amount: number;
  p_applied_at: string;
  p_is_yields: boolean;
  p_is_leave: boolean;
  p_is_decease: boolean;
}

export default class WithdrawalBatchReader implements BatchReaderInfo<BatchReaderResult> {
  async execute(file: Buffer): Promise<BatchReaderResult> {
    const excel = xlsx.parse(file);
    const worksheet = excel[0].data;
    const data: WithdrawalBatchReaderInfo[] = [];
    const messages: string[] = [];

    worksheet.forEach((row, index, d) => {
      if (index > 0) { // skiping headers
        if (EmptyString(row[0]) === '') {
          return messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna nombre.`);
        }

        if (EmptyString(row[1]) === '') {
          return messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna monto.`);
        }

        if (EmptyString(row[2]) === '') {
          return messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna fecha.`);
        }

        data.push({
          p_associate_name: EmptyString(row[0]),
          p_amount: Number(row[1]),
          p_applied_at: `${row[2]}T00:00:00.000Z`,
          p_is_yields: !(EmptyString(row[3]) === ''),
          p_is_leave: !(EmptyString(row[4]) === ''),
          p_is_decease: !(EmptyString(row[5]) === '')
        });
      }
    });

    const result: BatchReaderResult = { 
      rows: data as WithdrawalBatchReaderInfo[],
      messages: messages
    };

    return result;
  }
}
export type { WithdrawalBatchReaderInfo }