import BatchReaderInfo from "../../batch-reader-info";
import xlsx from "node-xlsx";
import BatchReaderResult from "../../batch-reader-result";
import EmptyString from "../../../../util/empty-string";

type ContributionBatchReaderInfo = {
  p_associate_rfc: string;
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
        if (EmptyString(row[0]) === '') {
          messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna rfc.`);
        }

        if (EmptyString(row[2]) === '') {
          messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna monto.`);
        }

        if (EmptyString(row[3]) === '') {
          messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna fecha.`);
        }

        data.push({
          p_associate_rfc: row[0],
          p_amount: Number(row[2]),
          p_applied_at: `${row[3]}T00:00:00.000Z`
        });
      }
    });

    const result: BatchReaderResult = {
      messages: messages,
      rows: data as ContributionBatchReaderInfo[]
    };

    return result;
  }
}
export type { ContributionBatchReaderInfo }