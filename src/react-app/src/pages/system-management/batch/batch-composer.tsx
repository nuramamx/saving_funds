import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ZodIssue } from "zod";
import { BinMinusIn } from "iconoir-react";
import { produce } from "immer";
import BatchComposerCommand from "../../../core/interfaces/commands/batch-composer-command";
import useNotificationStore from "../../../core/stores/notification-store";
import useValidationModalStore from "../../../core/stores/validation-modal-store";
import SFTextInput from "../../../components/form/sf-text-input";
import SFSelectInput from "../../../components/form/sf-select-input";
import BatchDetailSpec from "../../../core/interfaces/specs/batch-detail-spec";
import BatchDetailValidation from "../../../core/validations/batch-detail-validation";
import IssueTransform from "../../../core/util/transforms/issue-transform";
import BatchValidation from "../../../core/validations/batch-validation";
import AppConstants from "../../../core/constants/app-constants";
import CommandResponseInfo from "../../../core/interfaces/info/command-response-info";
import useAuthStore from "../../../core/stores/auth-store";

export default function BatchComposer() {
  const batchSpecInitialState = {
    id: undefined!,
    name: '',
    batchFunction: '',
    isActive: true,
    details: []
  };
  const batchDetailSpecInitialState = {
    name: '',
    friendlyName: '',
    description: '',
    parameter: '',
    type: '',
  };

  const [batch, setBatch] = useState<BatchComposerCommand>(batchSpecInitialState);
  const [batchDetails, setBatchDetails] = useState<BatchDetailSpec[]>([]);
  const [batchDetail, setBatchDetail] = useState<BatchDetailSpec>(batchDetailSpecInitialState);
  const [batchParameter, setBatchParameter] = useState('');
  const [batchDetailEdit, setBatchDetailEdit] = useState(false);
  const [issues, setIssues] = useState<ZodIssue[]>([]);
  const navigate = useNavigate();
  const { pushNotification } = useNotificationStore();
  const { setValidationModal } = useValidationModalStore();
  const { token } = useAuthStore();
  const columnTypes = [
    { key: '-', value: '-' },
    { key: 'Texto corto', value: 'varchar' },
    { key: 'Texto largo', value: 'text' },
    { key: 'Númerico', value: 'integer' },
    { key: 'Decimal', value: 'numeric' },
    { key: 'Fecha', value: 'timestamp' },
    { key: 'Condicional', value: 'boolean' }
  ];

  const handleSave = async () => {
    if (!handleBatchValidate()) return;

    if (batchDetails.length <= 0) {
      return pushNotification({
        message: `Favor de agregar columnas.`,
        type: 'danger'
      });
    }

    try {
      const response = await fetch(`${AppConstants.apiBatch}/create`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(batch)
      });

      if (!response.ok) {
        const error = await response.json() as CommandResponseInfo;

        return setValidationModal({
          message: error.message,
          show: true,
          errors: error.errors,
          data: error.data
        });
      }

      handleClear();
      pushNotification({ message: 'Registro realizado con éxito.', type: 'success' });
      navigate('/system/batch/list');
    } catch (err: any) {
      pushNotification({ message: err.message, type: 'danger' });
    }
    finally {
    }
  };

  const handleAddOrUpdateBatchDetail = () => {
    if (!handleBatchDetailValidate()) return;
    if (!handleDuplication()) return;

    if (batchDetailEdit) {
      setBatchDetails(produce(draft => {
        const index = draft.findIndex(x => x.parameter === batchParameter);
        if (index !== -1) {
          draft[index] = batchDetail
        };
      }));
      setBatchDetail(batchDetailSpecInitialState);
      setBatchDetailEdit(false);
    } else {
      setBatchDetails((draft) => [...draft, batchDetail]);
      setBatchDetail(batchDetailSpecInitialState);
    }

    setIssues([]);
  };

  const handleEdit = (batchDetail: BatchDetailSpec) => {
    setBatchDetail(batchDetail)
    setBatchParameter(batchDetail.parameter)
    setBatchDetailEdit(true);
  };

  const handleRemoveDetail = (parameter: string) => {
    setBatchDetails(produce(draft => {
      const index = draft.findIndex(x => x.parameter === parameter);
      if (index !== -1) draft.splice(index, 1);
    }));
  };

  const handleDuplication = (): boolean => {
    const index = batchDetails
      .findIndex(x => x.name === batchDetail.name.trim() ||
        x.parameter === batchDetail.parameter.trim()
      );

    if (index === -1) {
      return true;
    } else {
      pushNotification({
        message: `No se admiten duplicados.`,
        type: 'danger'
      });

      return false
    }
  };

  const handleBatchDetailValidate = (): boolean => {
    const result = BatchDetailValidation.safeParse(batchDetail);

    if (!result.success) {
      pushNotification({
        message: `Favor de revisar los campos requeridos.`,
        type: 'danger'
      });

      setIssues(IssueTransform('batch-detail-column', result.error.issues));      
    }

    return result.success;
  };

  const handleBatchValidate = (): boolean => {
    const result = BatchValidation.safeParse(batch);

    if (!result.success) {
      pushNotification({
        message: `Favor de revisar los campos requeridos.`,
        type: 'danger'
      });

      setIssues(IssueTransform('batch', result.error.issues));      
    }

    return result.success;
  };

  const handleClear = () => {
    setBatch(batchSpecInitialState);
    setBatchDetail(batchDetailSpecInitialState);
    setBatchDetails([]);
    setIssues([]);
  };

  useEffect(() => {
    setBatch({...batch, details: batchDetails});
  }, [(batchDetails)])

  return (
    <>
    <div className="columns">
      <div className="column">
        <SFTextInput id="batch-name" name="Nombre del Batch" value={batch.name} onChange={(v) => setBatch({...batch, name: v.toLocaleUpperCase() })} issues={issues} />
        <SFTextInput id="batch-batchFunction" name="Función" value={batch.batchFunction} onChange={(v) => setBatch({...batch, batchFunction: v.toLocaleLowerCase() })} issues={issues} />
      </div>
      <div className="column">
        <SFTextInput id="batch-detail-column-name" name="Nombre de columna" value={batchDetail.name} onChange={(v) => setBatchDetail({...batchDetail, name: v.toLocaleUpperCase() })} issues={issues} />
        <SFTextInput id="batch-detail-column-friendly-name" name="Nombre identificativo" value={batchDetail.friendlyName} onChange={(v) => setBatchDetail({...batchDetail, friendlyName: v.toLocaleUpperCase() })} issues={issues} />
        <SFTextInput id="batch-detail-column-description" name="Descripción" value={batchDetail.description} onChange={(v) => setBatchDetail({...batchDetail, description: v.toLocaleUpperCase() })} issues={issues} />
        <SFTextInput id="batch-detail-column-parameter" name="Parámetro" value={batchDetail.parameter} onChange={(v) => setBatchDetail({...batchDetail, parameter: v.toLocaleLowerCase() })} issues={issues} />
        <SFSelectInput options={columnTypes} id="batch-detail-column-type" name="Tipo de dato" value={batchDetail.type} onChange={(v) => setBatchDetail({...batchDetail, type: v })} issues={issues} />
        <br />
        <button className="button is-pulled-right" onClick={handleAddOrUpdateBatchDetail}>{batchDetailEdit ? 'Actualizar' : 'Agregar'}</button>
      </div>
      <div className="column is-two-fifths">
        <br />
        {batchDetails != undefined && batchDetails?.length > 0 ? (
          batchDetails.map((detail: BatchDetailSpec) => (
            <div className="box animate__animated animate__bounceInUp">
              <button onClick={() => handleEdit(detail)}>{detail.name}:&nbsp;[{detail.parameter} {'=>'} {detail.type}]</button>
                <button className="button is-pulled-right" style={{ marginTop: '-7px' }} onClick={() => handleRemoveDetail(detail.parameter)}><BinMinusIn /></button>
            </div>
          ))
        ): (
          <></>
        )}
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
          <button className="button is-primary" onClick={() => handleSave()}>Guardar</button>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
}