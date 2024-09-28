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

export default function BatchUpload() {
  const initialState: BatchUploadCommand = {
    process: 0,
    file: undefined!,
    filename: '',
  };
  const [batchUpload, setBatchUpload] = useState<BatchUploadCommand>(initialState);
  const { pushNotification } = useNotificationStore();
  const { setValidationModal } = useValidationModalStore();
  const [issues, setIssues] = useState<ZodIssue[]>([]);
  const [log, setLog] = useState<string>('');

  const handleUpload = async () => {
    if (!handleBatchUploadValidate()) return;

    const formData = new FormData();
    formData.append('file', batchUpload.file);
    formData.append('process', batchUpload.process.toString());

    try {
      const response = await fetch(`${AppConstants.apiBatch}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}` },
        body: formData
      });

      const result = await response.json() as CommandResponseInfo;
    
      if (!response.ok) {
        return setValidationModal({
          message: result.message,
          show: true,
          errors: result.errors,
          data: result.data
        });
      }

      setLog(result.data);    
      pushNotification({ message: 'Registro realizado con éxito.', type: 'success' });
      handleClear();
    } catch (err: any) {
      pushNotification({ message: err.message, type: 'danger' });
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

  const handleClear = () => {
    setIssues([]);
    setBatchUpload(initialState);
  }

  return (
    <>
      <div className="columns">
        <div className="column is-3">
          <SFFileInput id="batch-upload-file" name="Archivo" onChange={(v1, v2) => setBatchUpload({ ... batchUpload, filename: v1, file: v2 })} accept=".xls,.xlsx" issues={issues} />
        </div>
        <div className="column is-3">
          <SFSelectBatch id="batch-upload-process" name="Proceso" value={batchUpload.process} onChange={(v) => setBatchUpload({ ...batchUpload, process: v })} issues={issues} />
        </div>
      </div>
      <div className="columns">
        <div className="column is-full">
          <label style={{ fontWeight: 'bold' }}>Resultados</label>
          <textarea readOnly={true} style={{ width: '100%', height: '55vh' }}>
            {log}
          </textarea>
        </div>
      </div>
      <div className="mt-auto">
        <nav className="level">
          <div className="level-left"></div>
          <div className="level-right">
            <div className="level-item">
              <button className="button is-light" onClick={() => handleClear()}>Limpiar</button>
            </div>
            <div className="level-item">
            <button className="button is-primary" onClick={() => handleUpload()}>Subir</button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}