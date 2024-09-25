import { memo, useEffect, useState } from "react"
import { objectToCamel } from "ts-case-convert";
import { SFNumberInputInfo } from "../form/sf-number-input";
import AppConstants from "../../core/constants/app-constants";
import CommandResponseInfo from "../../core/interfaces/info/command-response-info";
import BatchListSpec from "../../core/interfaces/specs/list/batch-list-spec";
import useNotificationStore from "../../core/stores/notification-store";

const SFSelectBatch = memo(({ id, name, value, issues, onChange }: SFNumberInputInfo) => {
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
    <div className="field">
      <label htmlFor={id} className="label">{name}</label>
      <div className="select" style={{display: "grid"}}>
        <select id={id} value={value} onChange={(e) => onChange ? onChange(parseInt(e.target.value)) : undefined}>
          <option value={0}>---</option>
          {batchs.map((option: BatchListSpec) => [
            <option key={option.id} value={option.id}>{option.name}</option>
          ])}
        </select>
      </div>
      <span className="has-text-danger" style={{ fontSize: '13px' }}>{issues?.find(x => `${x.path[0]}-${x.path[1]}` === id)?.message}</span>
    </div>
  )
});

export default SFSelectBatch;