import BatchReaderInfo from "../../batch-reader-info";
import xlsx from "node-xlsx";
import BatchReaderResult from "../../batch-reader-result";

type WithdrawalBatchReaderInfo = {
  p_associate_name: string;
  p_amount: number;
  p_is_interest: boolean;
}

export default class WithdrawalBatchReader implements BatchReaderInfo<BatchReaderResult> {
  async execute(file: Buffer): Promise<BatchReaderResult> {
    const excel = xlsx.parse(file);
    const worksheet = excel[0].data;
    const data: WithdrawalBatchReaderInfo[] = [];
    const messages: string[] = [];

    worksheet.forEach((row, index, d) => {
      if (index > 0) { // skiping headers
        if (row[0] === null && row[0] === undefined && row[0].trim() === '') {
          messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna A.`);
        }

        if (row[1] === null && row[1] === undefined && row[1].trim() === '') {
          messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna B.`);
        }

        if (row[2] === null && row[2] === undefined && row[2].trim() === '') {
          messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna C.`);
        }

        console.log(d[index][0]);

        data.push({
          p_associate_name: row[0],
          p_amount: Number(row[1]),
          p_is_interest: Boolean(row[2])
        })
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