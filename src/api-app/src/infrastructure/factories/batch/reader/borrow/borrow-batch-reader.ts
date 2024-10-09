import BatchReaderInfo from "../../batch-reader-info";
import xlsx from "node-xlsx";
import BatchReaderResult from "../../batch-reader-result";
import EmptyString from "../../../../util/empty-string";

type BorrowBatchReaderInfo = {
  p_file_number: string;
  p_associate_name: string;
  p_requested_amount: number;
  p_period: number;
  p_annual_rate: number;
  p_start_at: string;
  p_is_fortnightly: boolean;
}

export default class BorrowBatchReader implements BatchReaderInfo<BatchReaderResult> {
  async execute(file: Buffer): Promise<BatchReaderResult> {
    const excel = xlsx.parse(file);
    const worksheet = excel[0].data;
    const data: BorrowBatchReaderInfo[] = [];
    const messages: string[] = [];

    worksheet.forEach((row, index, d) => {
      if (index > 0) { // skiping headers
        if (EmptyString(row[0]) === '') {
          return messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna folio.`);
        }

        if (EmptyString(row[1]) === '') {
          return messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna nombre.`);
        }

        if (EmptyString(row[2]) === '') {
          return messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna monto.`);
        }

        if (EmptyString(row[3]) === '') {
          return messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna periodo.`);
        }

        if (EmptyString(row[4]) === '') {
          return messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna interés anual.`);
        }

        if (EmptyString(row[5]) === '') {
          return messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna fecha.`);
        }

        data.push({
          p_file_number: row[0],
          p_associate_name: row[1],
          p_requested_amount: Number(row[2]),
          p_period: Number(row[3]),
          p_annual_rate: Number(row[4]),
          p_start_at: `${row[5]}T00:00:00.000Z`,
          p_is_fortnightly: !(EmptyString(row[6]) === '')
        });
      }
    });

    const result: BatchReaderResult = { 
      rows: data as BorrowBatchReaderInfo[],
      messages: messages
    };

    return result;
  }
}
export type { BorrowBatchReaderInfo }