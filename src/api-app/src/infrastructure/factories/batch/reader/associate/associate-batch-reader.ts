import BatchReaderInfo from "../../batch-reader-info";
import xlsx from "node-xlsx";
import BatchReaderResult from "../../batch-reader-result";
import AssociateDetailSpec from "../../../../../persistence/specs/base/associate-detail-spec";
import AssociateAddressSpec from "../../../../../persistence/specs/base/associate-address-spec";
import AssociateWorkplaceSpec from "../../../../../persistence/specs/base/associate-workplace-spec";
import AssociateBeneficiarySpec from "../../../../../persistence/specs/base/associate-beneficiary-spec";
import { error } from "console";
import EmptyString from "../../../../util/empty-string";

type AssociateBatchReaderInfo = {
  p_rfc: string;
  p_name: string;
  p_gender: string;
  p_detail: string;
  p_address: string;
  p_workplace: string;
  p_beneficiaries: string; 
}

export default class AssociateBatchReader implements BatchReaderInfo<BatchReaderResult> {
  async execute(file: Buffer): Promise<BatchReaderResult> {
    const excel = xlsx.parse(file);
    const worksheet = excel[0].data;
    const data: AssociateBatchReaderInfo[] = [];
    const messages: string[] = [];

    worksheet.forEach((row, index, d) => {
      if (index > 0) { // skiping headers
        if (EmptyString(row[0]) === '') {
          messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna rfc.`);
        }

        if (EmptyString(row[1]) === '') {
          messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna nombre.`);
        }

        if (EmptyString(row[2]) === '') {
          messages.push(`Fila ${index} omitida por no cumplir con valor aceptado en columna sexo.`);
        }

        const detail: AssociateDetailSpec = {
          agreementId: 0,
          dependencyKey: EmptyString(row[3]),
          agreement: EmptyString(row[4]),
          category: EmptyString(row[5]),
          salary: Number(row[6] ?? 0),
          socialContribution: Number(row[7] ?? 0),
          frequentContribution: Number(row[8] ?? 0),
          requestDate: new Date()
        };

        const address: AssociateAddressSpec = {
          street: EmptyString(row[10]),
          settlement: EmptyString(row[11]),
          town: EmptyString(row[12]),
          postalCode: EmptyString(row[13]),
          state: EmptyString(row[14]),
          city: EmptyString(row[15]),
          phone: EmptyString(row[16]),
          mobile: EmptyString(row[17]),
          email: EmptyString(row[18]),
          stateId: 0,
          cityId: 0,
        };

        const workplace: AssociateWorkplaceSpec = {
          key: EmptyString(row[20]),
          name: EmptyString(row[21]),
          phone: EmptyString(row[22])
        };

        const beneficiaries: AssociateBeneficiarySpec[] = [
          { name: EmptyString(row[24]), percentage: Number(row[25] ?? 0) },
          { name: EmptyString(row[26]), percentage: Number(row[27] ?? 0) },
          { name: EmptyString(row[28]), percentage: Number(row[29] ?? 0) },
          { name: EmptyString(row[30]), percentage: Number(row[31] ?? 0) },
          { name: EmptyString(row[32]), percentage: Number(row[33] ?? 0) }
        ];

        data.push({
          p_rfc: row[0],
          p_name: row[1],
          p_gender: row[2],
          p_detail: JSON.stringify(detail),
          p_address: JSON.stringify(address),
          p_workplace: JSON.stringify(workplace),
          p_beneficiaries: JSON.stringify(beneficiaries)
        });
      }
    });

    const result: BatchReaderResult = {
      messages: messages,
      rows: data as AssociateBatchReaderInfo[]
    };

    return result;
  }
}
export type { AssociateBatchReaderInfo }