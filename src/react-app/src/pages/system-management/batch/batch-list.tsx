import { useEffect, useState } from "react";
import { objectToCamel } from "ts-case-convert";
import useNotificationStore from "../../../core/stores/notification-store";
import AppConstants from "../../../core/constants/app-constants";
import CommandResponseInfo from "../../../core/interfaces/info/command-response-info";
import BatchListSpec from "../../../core/interfaces/specs/list/batch-list-spec";

export default function BatchList() {
  const [hasError, setHasError] = useState<Boolean>(false);
  const [batchs, setBatchs] = useState<BatchListSpec[]>([]);
  const { pushNotification } = useNotificationStore();

  const fetchBatchs = async () => {
    try {
      const result = await fetch(`${AppConstants.apiBatch}`, {
        method: 'GET'
      });
      
      if (!result.ok) throw new Error('Ocurrió un error al realizar la petición');

      const response = await result.json() as CommandResponseInfo;

      if (!response.successful) throw new Error(response.message);

      const list = objectToCamel(response.data) as BatchListSpec[];

      setBatchs(list);
    } catch (err: any) {
      setHasError(true);
      pushNotification({ message: err.message, type: 'danger' });
    }
  };

  const handleReload = () => {
    if (!hasError) fetchBatchs();
  };

  useEffect(() => {
    handleReload();
  }, [hasError]);

  return (
    <div className="columns">
      <div className="column">
        <table className="table is-hoverable is-fullwidth" style={{fontSize: '12px'}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Funci&oacute;n</th>
              <th style={{ textAlign: 'center' }}>Activo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {batchs !== undefined && batchs?.length > 0 ? (
              batchs.map((batch: BatchListSpec) => (
              <tr key={batch.id}>
                <td>{batch.id}</td>
                <td>{batch.name}</td>
                <td>{batch.batchFunction}</td>
                <td style={{ textAlign: 'center' }}>{batch.isActive ? 'Si' : 'No'}</td>
                <td>
                  
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={5} style={{textAlign: 'center'}}>No hay batchs disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}