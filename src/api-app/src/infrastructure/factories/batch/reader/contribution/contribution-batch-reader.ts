import BatchReaderInfo from "../../batch-reader-info";
import xlsx from "node-xlsx";
import BatchReaderResult from "../../batch-reader-result";

type ContributionBatchReaderInfo = {
  p_associate_name: string;
  p_amount: number;
  p_applied_at: string;
}

export default class ContributionBatchReader implements BatchReaderInfo<BatchReaderResult> {
  async execute(file: Buffer): Promise<BatchReaderResult> {
    const excel = xlsx.parse(file);
    const worksheet = excel[0].data;
    const data: ContributionBatchReaderInfo[] = [];
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

        data.push({
          p_associate_name: row[0],
          p_amount: Number(row[1]),
          p_applied_at: `${row[2]}T00:00:00.000Z`
        })
      }
    });

    const result: BatchReaderResult = {
      messages: messages,
      rows: data as ContributionBatchReaderInfo[]
    };

    console.log(result);

    return result;
  }
}
export type { ContributionBatchReaderInfo }