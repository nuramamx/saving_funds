import { PDFViewer } from "@react-pdf/renderer";
import { Outlet, useLocation } from "react-router-dom";
import StatementReportPDF from "./associate/reports/statement-report-pdf";

export default function SavingFundManagement() {
  const location = useLocation();
  const route: string = "/savingfund";

  return (
    <>
    {route === location.pathname ? (
      <div>
      </div>
    ) : null}
    <Outlet></Outlet>
    </>
  );
}