import { DownloadSquare, GridPlus, Internet, Page } from "iconoir-react";
import { useCallback, useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { objectToCamel } from "ts-case-convert";
import AppConstants from "../../../../core/constants/app-constants";
import useNotificationStore from "../../../../core/stores/notification-store";
import useAuthStore from "../../../../core/stores/auth-store";
import TooltipElement from "../../../../components/elements/tooltip-element";
import StatementReportPDF from "../reports/statement-report-pdf";
import StatementReportDataSpec from "../../../../core/interfaces/specs/base/statement-report-data-spec";
import StatementReportListSpec from "../../../../core/interfaces/specs/list/statement-report-list-spec";
import CommandResponseInfo from "../../../../core/interfaces/info/command-response-info";
import saveAs from "file-saver";
import StatementReportWebModal from "../../saving-fund/modals/statement-report-web-modal";

type StatementReportActionItemParams = {
  associateName: string;
  associateId: number;
};

export default function StatementReportActionItem({ associateName, associateId }: StatementReportActionItemParams) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showStatementReportWebModal, setShowStatementReportWebModal] = useState(false);
  const { pushNotification } = useNotificationStore();
  const { token } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsActive(false);
  }, []);

  const fetchStatementReportData = async () => {
    const result = await fetch(`${AppConstants.apiReport}/statement/data/${associateId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!result.ok)
      pushNotification({ message: result.statusText, type: 'danger' });

    const response = await result.json() as CommandResponseInfo;
    const responseData = objectToCamel(response.data) as StatementReportDataSpec[];
    
    if (response.successful) return responseData;
    else throw new Error(response.message);
  };

  const fetchStatementReportList = async () => {
    const result = await fetch(`${AppConstants.apiReport}/statement/list/${associateId}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!result.ok)
      pushNotification({ message: result.statusText, type: 'danger' });

    const response = await result.json() as CommandResponseInfo;
    const responseData = objectToCamel(response.data) as StatementReportListSpec[];

    if (response.successful) return responseData;
    else throw new Error(response.message);
  };

  const handleDownloadExcel = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${AppConstants.apiReport}/statement/${associateId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok)
        throw new Error(response.statusText);

      const buffer = await response.arrayBuffer();

      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const fakeLink = document.createElement('a');
      fakeLink.href = url;
      fakeLink.setAttribute('download', `Estado de cuenta - ${associateName}.xlsx`);
      document.body.appendChild(fakeLink);
      fakeLink.click();
      document.body.removeChild(fakeLink);
      window.URL.revokeObjectURL(url);
      
      pushNotification({ message: 'Reporte generado con éxito.', type: 'success' });
    } catch (err: any) {
      pushNotification({ message: err.message, type: 'danger' });
    }
    finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setLoading(true);
    Promise.all([fetchStatementReportData, fetchStatementReportList])
      .then(async ([data, list]) => {
        const statementData = await data();
        const statementList = await list();

        if (statementData && statementList && statementList.length > 0) {
          const blob = await pdf(<StatementReportPDF data={statementData?.[0]} list={statementList} />).toBlob();
          saveAs(blob, `Estado de cuenta - ${statementData?.[0].associateName}.pdf`);
        }
      })
      .catch (err => {
        pushNotification({ message: 'No se pudo generar el estado de cuenta en PDF.', type: 'danger' });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleViewWeb = async (show: boolean) => {
    setShowStatementReportWebModal(show);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  return (
    <>
    <div className={`dropdown is-right ${isActive ? 'is-active': ''}`}>
      <div className="dropdown-trigger">
        <button onClick={(e) => setIsActive(!isActive)} aria-haspopup="true" aria-controls="dropdown-menu" data-tooltip-id="reports-tooltip">
          <DownloadSquare />
          <TooltipElement id="reports-tooltip" text="Reportes" />
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          <div className="dropdown-item">
            <strong>
              Estado de cuenta
            </strong>
          </div>
          <hr className="dropdown-divider" />
          <button className="dropdown-item" onClick={handleDownloadExcel}><GridPlus />&nbsp;&nbsp;Formato Excel</button>
          <button className="dropdown-item" onClick={handleDownloadPDF}><Page />&nbsp;&nbsp;Formato PDF</button>
          <button className="dropdown-item" onClick={() => handleViewWeb(true)}><Internet />&nbsp;&nbsp;Formato Web</button>
          <span className="dropdown-item" style={{ fontSize: '11px'}}>
            {loading && (
              <>
              <span className="loader" style={{ display: 'inline-block'}}></span>&nbsp;&nbsp;
              Generando reporte...
              </>
            )}
          </span>
        </div>
      </div>
    </div>
    <StatementReportWebModal associateId={associateId} associateName={`${associateId} - ${associateName}`} show={showStatementReportWebModal} onClose={() => setShowStatementReportWebModal(false)} />
    </>
  )
}