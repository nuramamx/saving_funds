import { useState } from "react";
import { ZodIssue } from "zod";
import useNotificationStore from "../../../core/stores/notification-store";
import BatchUploadCommand from "../../../core/interfaces/commands/batch-upload-command";
import SFSelectBatch from "../../../components/dynamic-elements/sf-select-batch";
import SFFileInput from "../../../components/form/sf-file-input";
import BatchUploadValidation from "../../../core/validations/batch-upload-validation";
import IssueTransform from "../../../core/util/transforms/issue-transform";
import AppConstants from "../../../core/constants/app-constants";
import CommandResponseInfo from "../../../core/interfaces/info/command-response-info";
import useValidationModalStore from "../../../core/stores/validation-modal-store";
import useAuthStore from "../../../core/stores/auth-store";
import { useLocation, useNavigate } from "react-router-dom";

export default function BatchUpload() {
  const initialState: BatchUploadCommand = {
    process: '',
    file: undefined!,
    filename: '',
    disableRules: false,
    validationOnly: false
  };
  const [batchUpload, setBatchUpload] = useState<BatchUploadCommand>(initialState);
  const navigate = useNavigate();
  const location = useLocation();
  const { pushNotification } = useNotificationStore();
  const { setValidationModal } = useValidationModalStore();
  const [issues, setIssues] = useState<ZodIssue[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { token, user } = useAuthStore();

  const handleUpload = async () => {
    setLoading(true);
    setMessages([]);
    if (!handleBatchUploadValidate()) return;

    const formData = new FormData();
    formData.append('file', batchUpload.file);
    formData.append('process', batchUpload.process.toString());
    formData.append('disableRules', batchUpload.disableRules ? 'x' : '');
    formData.append('validationOnly', batchUpload.validationOnly ? 'x' : '');

    try {
      const response = await fetch(`${AppConstants.apiBatch}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const result = await response.json() as CommandResponseInfo;
      setMessages(result.data.map((name: any) => ( name + '\r\n\r\n' )));
    
      if (!response.ok) {
        return setValidationModal({
          message: result.message,
          show: true,
          errors: result.errors,
          data: result.data
        });
      }

      pushNotification({ message: result.message, type: result.type });
    } catch (err: any) {
      pushNotification({ message: err.message, type: 'danger' });
    } finally {
      navigate(location.pathname, { replace: true });
      setLoading(false);
    }
  };

  const handleBatchUploadValidate = (): boolean => {
    const result = BatchUploadValidation.safeParse(batchUpload);

    if (!result.success) {
      pushNotification({
        message: `Favor de revisar los campos requeridos.`,
        type: 'danger'
      });

      setIssues(IssueTransform('batch-upload', result.error.issues));			
    }

    return result.success;
  };

  return (
    <>
      <div className="columns">
        <div className="column is-3" data-tg-tour="Archivo con los registros a cargar en el sistema.">
          <SFFileInput id="batch-upload-file" name="Archivo" onChange={(v1, v2) => setBatchUpload({ ... batchUpload, filename: v1, file: v2 })} accept=".xls,.xlsx" issues={issues} />
        </div>
        <div className="column is-3" data-tg-tour="Tipo de proceso a realizar: APORTACIONES, PAGOS, RETIROS, SOCIOS y PRÉSTAMOS.">
          <SFSelectBatch id="batch-upload-process" name="Proceso" value={batchUpload.process} onChange={(v) => setBatchUpload({ ...batchUpload, process: v })} issues={issues} />
        </div>
        {batchUpload.process !== 'APORTACIONES' && batchUpload.process !== 'SOCIOS' && (
          <div className="column is-4">
            <div className="checkboxes" style={{ padding: '20px' }}>
              <label className="checkbox" data-tg-tour="Nos deshabilita las reglas de negocio, permitiendo ingresar información en bruto sin validar.">
                <input type="checkbox" checked={batchUpload.disableRules} onChange={() => setBatchUpload({ ...batchUpload, disableRules: !batchUpload.disableRules })} />
                &nbsp;Deshabilitar reglas
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <label className="checkbox" data-tg-tour="Nos deshabilita la inserción de información en la base de datos, permitiendo comprobar que la información esté correcta.">
                <input type="checkbox" checked={batchUpload.validationOnly} onChange={() => setBatchUpload({ ...batchUpload, validationOnly: !batchUpload.validationOnly })} />
                &nbsp;Solo validaci&oacute;n
              </label>
            </div>
          </div>
        )}
      </div>
      <div className="columns" data-tg-tour="Apartado de resultados, se nos informará aquí los registros que no pudieron ser ingresados al sistema.">
        <div className="column is-full">
          <label style={{ fontWeight: 'bold' }}>Resultados</label>
          <div style={{ width: '100%', height: '55vh', border: '0.5px solid gray', overflow: 'scroll' }}>
            {messages !== null && messages !== undefined && messages.length > 0 && (
              messages.map((name: any) => (
               <p style={{ color: '#ff1212' }}>{name}</p>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto" style={{ display: user.role === 'ADMIN' ? 'block' : 'none'}}>
        <nav className="level">
          <div className="level-left"></div>
          <div className="level-right">
            <div className="level-item">
            <button className="button is-primary" onClick={() => handleUpload()}>
            {!loading ? 'Subir' : (<div className="loader"></div>)}
            </button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}