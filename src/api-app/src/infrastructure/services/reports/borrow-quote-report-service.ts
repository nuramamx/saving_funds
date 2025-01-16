import Excel from "exceljs";
import fs from "fs";
import ReportServiceInfo from "./interfaces/report-service-info";
import BorrowQuoteReportDataSpec from "../../../persistence/specs/data/borrow-quote-report-data-spec";

export default class BorrowQuoteReportService implements ReportServiceInfo {
  constructor(readonly data: BorrowQuoteReportDataSpec) {}
  
  async createXLSX(): Promise<Excel.Buffer> {
    throw new Error("Method not implemented.");
  }
  
  async createPDF(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async create(): Promise<Excel.Buffer> {
    const workbook = new Excel.Workbook();
    const buffer = fs.readFileSync('./public/borrow_quote_report_template.xlsx');

    await workbook.xlsx.load(buffer);

    const worksheetQuote = workbook.getWorksheet('COTIZACIÓN');

    if (worksheetQuote !== null && worksheetQuote !== undefined) this.worksheetQuoteChanges(worksheetQuote);

    return await workbook.xlsx.writeBuffer();
  }

  worksheetQuoteChanges(worksheet: Excel.Worksheet): void {
    if (worksheet !== null && worksheet !== undefined) {
      worksheet.getCell('C10').value = this.data.associate_name;
      worksheet.getCell('C11').value = Number(this.data.requested_amount);
      worksheet.getCell('C11').numFmt = '$#,##0.00';
      worksheet.getCell('E11').value = `(${this.data.requested_amount_in_words})`;
      worksheet.getCell('F13').value = this.data.period;
      worksheet.getCell('F14').value = Number(this.data.total_with_interests);
      worksheet.getCell('F14').numFmt = '$#,##0.00';
      worksheet.getCell('F15').value = Number(this.data.guarantee_fund);
      worksheet.getCell('F15').numFmt = '$#,##0.00';
      worksheet.getCell('F16').value = Number(this.data.total_due);
      worksheet.getCell('F16').numFmt = '$#,##0.00';
      worksheet.getCell('F17').value = Number(this.data.payment);
      worksheet.getCell('F17').numFmt = '$#,##0.00';
      worksheet.getCell('A31').value = Number(this.data.payment);
      worksheet.getCell('A31').numFmt = '$#,##0.00';
      worksheet.getCell('C31').value = `(${this.data.payment_in_words})`;
      worksheet.getCell('A32').value = worksheet.getCell('A32').value?.toString().replace('{{START_AT}}', this.data.start_at);
    }
  }
}