import Excel from "exceljs";
import fs from "fs";
import ReportServiceInfo from "./interfaces/report-service-info";
import StatementReportListSpec from "../../../persistence/specs/list/statement-report-list-spec";
import StatementReportDataSpec from "../../../persistence/specs/data/statement-report-data-spec";

export default class StatementReportService implements ReportServiceInfo {
  constructor(
    readonly data: StatementReportDataSpec,
    readonly list: StatementReportListSpec[]) {}

  async create(): Promise<Excel.Buffer> {
    const workbook = new Excel.Workbook();
    const buffer = fs.readFileSync('./public/statement_report_template.xlsx');

    await workbook.xlsx.load(buffer);

    const worksheetInformative = workbook.getWorksheet('INFORMATIVO');
    const worksheetDelivery = workbook.getWorksheet('ENTREGA');

    if (worksheetInformative !== null && worksheetInformative !== undefined) this.worksheetInformativeChanges(worksheetInformative);

    // Add rounded amount to withdrawal to current year withdrawals (only for delivery)
    this.list.map((x) => {
      if (x.year === new Date().getFullYear()) {
        x.withdrawals_summarized = Number(x.withdrawals_summarized) - Number(this.data.amount_available_to_withdrawal_rounded);
        x.net_total = Number(x.net_total) - Number(this.data.amount_available_to_withdrawal_rounded);
      }
    })

    if (worksheetDelivery !== null && worksheetDelivery !== undefined) this.worksheetDeliveryChanges(worksheetDelivery);
    
    return await workbook.xlsx.writeBuffer();
  }

  worksheetInformativeChanges(worksheet: Excel.Worksheet): void {
    if (worksheet !== null && worksheet !== undefined) {
      worksheet.getCell('C10').value = this.data.associate_code;
      worksheet.getCell('C11').value = this.data.associate_name;
      worksheet.getCell('C12').value = this.data.date_range;
      worksheet.getCell('C13').value = Number(this.data.frequent_contribution);
      worksheet.getCell('C13').numFmt = '$#,##0.00';
      worksheet.getCell('H13').value = Number(this.data.count_frequency).toString();
      worksheet.getCell('E13').value = worksheet.getCell('E13').value?.toString().replace('{{CONTRIBUTION_FREQ}}', this.data.is_fortnightly ? 'QUINCENAS' : 'MESES');
      worksheet.getCell('H18').value = Number(this.data.amount_to_withhold);
      worksheet.getCell('H18').numFmt = '$#,##0.00';
      worksheet.getCell('H19').value = Number(this.data.amount_available_to_withdrawal);
      worksheet.getCell('H19').numFmt = '$#,##0.00';
      worksheet.getCell('A19').value = worksheet.getCell('A19').value?.toString().replace('{{CURRENT_YEAR}}', this.data.current_year.toString())
      

      this.list.forEach((row: StatementReportListSpec, index) => {
        const rowNumber = index + 17;
        const addedRow = worksheet.insertRow(rowNumber, [
          undefined,
          row.year,
          Number(row.initial_balance),
          Number(row.contribution_summarized),
          Number(row.annual_interest_rate),
          Number(row.yields),
          Number(row.withdrawals_summarized),
          Number(row.refund),
          Number(row.net_total)
        ]);

        worksheet.getCell(`C${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`D${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`E${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`F${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`G${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`H${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`I${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.unMergeCells(`H${rowNumber}`);
        worksheet.unMergeCells(`I${rowNumber}`);
        worksheet.unMergeCells(`J${rowNumber}`);
        worksheet.unMergeCells(`K${rowNumber}`);

        addedRow.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        });
      });

      for (let i = 1; i <= this.list.length; i++) {
        const cells = i+16;
        worksheet.mergeCells(`I${cells}:J${cells}`);
      }
    }
  }

  worksheetDeliveryChanges(worksheet: Excel.Worksheet): void {
    if (worksheet !== null && worksheet !== undefined) {
      worksheet.getCell('C10').value = this.data.associate_code;
      worksheet.getCell('C11').value = this.data.associate_name;
      worksheet.getCell('C12').value = this.data.date_range;
      worksheet.getCell('C13').value = Number(this.data.frequent_contribution);
      worksheet.getCell('C13').numFmt = '$#,##0.00';
      worksheet.getCell('H13').value = Number(this.data.count_frequency).toString();
      worksheet.getCell('E13').value = worksheet.getCell('E13').value?.toString().replace('{{CONTRIBUTION_FREQ}}', this.data.is_fortnightly ? 'QUINCENAS' : 'MESES');
      worksheet.getCell('H18').value = Number(this.data.amount_available_to_withdrawal);
      worksheet.getCell('H18').numFmt = '$#,##0.00';
      worksheet.getCell('H19').value = Number(this.data.amount_available_to_withdrawal_rounded);
      worksheet.getCell('H19').numFmt = '$#,##0.00';
      worksheet.getCell('H20').value = Number(this.data.net_balance_for_current_year);
      worksheet.getCell('H20').numFmt = '$#,##0.00';
      worksheet.getCell('H21').value = Number(this.data.amount_to_withhold);
      worksheet.getCell('H21').numFmt = '$#,##0.00';
      worksheet.getCell('H22').value = Number(this.data.net_balance);
      worksheet.getCell('H22').numFmt = '$#,##0.00';
      worksheet.getCell('A20').value = worksheet.getCell('A20').value?.toString().replace('{{CURRENT_YEAR}}', this.data.current_year.toString())

      this.list.forEach((row: StatementReportListSpec, index) => {
        const rowNumber = index + 17;
        const addedRow = worksheet.insertRow(rowNumber, [
          undefined,
          row.year,
          Number(row.initial_balance),
          Number(row.contribution_summarized),
          Number(row.annual_interest_rate),
          Number(row.yields),
          Number(row.withdrawals_summarized),
          Number(row.refund),
          Number(row.net_total)
        ]);

        worksheet.getCell(`C${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`D${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`E${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`F${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`G${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`H${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.getCell(`I${rowNumber}`).numFmt = '$#,##0.00';
        worksheet.unMergeCells(`H${rowNumber}`);
        worksheet.unMergeCells(`I${rowNumber}`);
        worksheet.unMergeCells(`J${rowNumber}`);
        worksheet.unMergeCells(`K${rowNumber}`);

        addedRow.eachCell((cell) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        });
      });

      for (let i = 1; i <= this.list.length; i++) {
        const cells = i+16;
        worksheet.mergeCells(`I${cells}:J${cells}`);
      }
    }
  }
}