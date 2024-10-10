import Excel from "exceljs";

export default interface ReportServiceInfo {
  create(): Promise<Excel.Buffer>;
  createXLSX(): Promise<Excel.Buffer>;
  createPDF(): Promise<void>;
}