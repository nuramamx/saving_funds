import { DownloadSquare, GridPlus, Page } from "iconoir-react";
import { useCallback, useEffect, useState } from "react";
import AppConstants from "../../../../core/constants/app-constants";
import useNotificationStore from "../../../../core/stores/notification-store";
import useAuthStore from "../../../../core/stores/auth-store";
import BorrowAuthorizationReportDataSpec from "../../../../core/interfaces/specs/base/borrow-authorization-report-data-spec";
import CommandResponseInfo from "../../../../core/interfaces/info/command-response-info";
import { objectToCamel } from "ts-case-convert";
import saveAs from "file-saver";
import BorrowAuthorizationReportPDF from "../reports/borrow-authorization-report-pdf";
import { pdf } from "@react-pdf/renderer";

type BorrowAuthorizationReportActionItemParams = {
  associateName: string;
  borrowId: number;
};

export default function BorrowAuthorizationReportActionItem({ associateName, borrowId }: BorrowAuthorizationReportActionItemParams) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { pushNotification } = useNotificationStore();
  const { token } = useAuthStore();

  const fetchBorrowAuthorizationReportData = async () => {
    const result = await fetch(`${AppConstants.apiReport}/borrow_authorization/data/${borrowId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!result.ok)
      pushNotification({ message: result.statusText, type: 'danger' });

    const response = await result.json() as CommandResponseInfo;
    const responseData = objectToCamel(response.data) as BorrowAuthorizationReportDataSpec[];
    
    if (response.successful) return responseData;
    else throw new Error(response.message);
  };
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsActive(false);
  }, []);

  const handleDownloadExcel = async () => {
    try {
      const response = await fetch(`${AppConstants.apiReport}/borrow_authorization/${borrowId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!response.ok)
        throw new Error(response.statusText);

      const buffer = await response.arrayBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const fakeLink = document.createElement('a');
      fakeLink.href = url;
      fakeLink.setAttribute('download', `Autorización de descuento por crédito - ${associateName}.xlsx`);
      document.body.appendChild(fakeLink);
      fakeLink.click();
      document.body.removeChild(fakeLink);
      window.URL.revokeObjectURL(url);
      
      pushNotification({ message: 'Reporte generado con éxito.', type: 'success' });
    } catch (err: any) {
      pushNotification({ message: err.message, type: 'danger' });
    }
  };

  const handleDownloadPDF = () => {
    Promise.all([fetchBorrowAuthorizationReportData])
      .then(async ([data]) => {
        const borrowAuthorizationData = await data();

        if (borrowAuthorizationData) {
          const blob = await pdf(<BorrowAuthorizationReportPDF data={borrowAuthorizationData?.[0]} />).toBlob();
          saveAs(blob, `Autorización de descuento por crédito - ${borrowAuthorizationData?.[0].associateName}.pdf`);
        }
      })
      .catch (err => {
        pushNotification({ message: 'No se pudo generar el estado de cuenta en PDF.', type: 'danger' });
      });
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  return (
    <>
    <div className={`dropdown is-right ${isActive ? 'is-active': ''}`}>
      <div className="dropdown-trigger">
        <button onClick={(e) => setIsActive(!isActive)} aria-haspopup="true" aria-controls="dropdown-menu"><DownloadSquare /></button>&nbsp;&nbsp;
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <strong>
              Autorizaci&oacute;n de Descuento por Cr&eacute;dito
            </strong>
          </div>
          <hr className="dropdown-divider" />
          <button className="dropdown-item" onClick={handleDownloadExcel}><GridPlus />&nbsp;&nbsp;Formato Excel</button>
          <button className="dropdown-item" onClick={handleDownloadPDF}><Page />&nbsp;&nbsp;Formato PDF</button>
        </div>
      </div>
    </div>
    </>
  )
}