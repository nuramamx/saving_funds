import { DownloadSquare, GridPlus, Page } from "iconoir-react";
import { useCallback, useEffect, useState } from "react";
import AppConstants from "../../../../core/constants/app-constants";
import useNotificationStore from "../../../../core/stores/notification-store";
import useValidationModalStore from "../../../../core/stores/validation-modal-store";
import useAuthStore from "../../../../core/stores/auth-store";
import TooltipElement from "../../../../components/elements/tooltip-element";

type StatementReportActionItemParams = {
  associateName: string;
  associateId: number;
};

export default function StatementReportActionItem({ associateName, associateId }: StatementReportActionItemParams) {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { pushNotification } = useNotificationStore();
  const { setValidationModal } = useValidationModalStore();
  const { token } = useAuthStore();
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setIsActive(false);
  }, []);

  const handleDownloadExcel = async () => {
    try {
      const response = await fetch(`${AppConstants.apiReport}/statement/${associateId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!response.ok)
        throw new Error(response.statusText);

      const buffer = await response.arrayBuffer();

      console.log(buffer);

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
  };

  const handleDownloadPDF = () => {

  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => { window.removeEventListener('keydown', handleKeyDown); };
  }, []);

  return (
    <>
    <div className={`dropdown is-right ${isActive ? 'is-active': ''}`}>
      <div className="dropdown-trigger">
        <button onClick={(e) => setIsActive(!isActive)} aria-haspopup="true" aria-controls="dropdown-menu" data-tooltip-id="reports-tooltip" >
          <DownloadSquare />
          <TooltipElement id="reports-tooltip" text="Reportes" />
        </button>&nbsp;&nbsp;
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
        </div>
      </div>
    </div>
    </>
  )
}