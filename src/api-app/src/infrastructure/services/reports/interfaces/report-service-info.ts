import Excel from "exceljs";

export default interface ReportServiceInfo {
  create(): Promise<Excel.Buffer>;
}