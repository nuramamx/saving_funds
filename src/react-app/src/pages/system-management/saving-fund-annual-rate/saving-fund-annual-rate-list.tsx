import { useEffect, useState } from "react";
import { objectToCamel } from "ts-case-convert";
import useNotificationStore from "../../../core/stores/notification-store";
import AppConstants from "../../../core/constants/app-constants";
import CommandResponseInfo from "../../../core/interfaces/info/command-response-info";
import SavingFundAnnualRateListSpec from "../../../core/interfaces/specs/list/saving-fund-annual-rate-list-spec";
import EditInlineActionButton from "../../../components/action-buttons/edit-inline-action-button";
import SavingFundAnnualRateUpdateCommand from "../../../core/interfaces/commands/saving-fund-annual-rate-update-command";
import SFPercentageInput from "../../../components/form/sf-percentage-input";

export default function SavingFundAnnualRateList() {
  const [hasError, setHasError] = useState<Boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [record, setRecord] = useState<SavingFundAnnualRateUpdateCommand>();
  const [annualRates, setAnnualRates] = useState<SavingFundAnnualRateListSpec[]>([]);
  const { pushNotification } = useNotificationStore();

  const fetchAnnualRates = async () => {
    try {
      const result = await fetch(`${AppConstants.apiSavingFund}/rates`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}` }
      });
      
      if (!result.ok) throw new Error('Ocurrió un error al realizar la petición');

      const response = await result.json() as CommandResponseInfo;

      if (!response.successful) throw new Error(response.message);

      const list = objectToCamel(response.data) as SavingFundAnnualRateListSpec[];

      setAnnualRates(list);
    } catch (err: any) {
      setHasError(true);
      pushNotification({ message: err.message, type: 'danger' });
    }
  };

  const handleEditMode = (id: number, active: boolean) => {
    if (active) {
      const data = annualRates.filter(x => x.id === id)[0] ?? undefined;

      if (data === undefined) pushNotification({ message: 'Registro no editable.', type: 'danger' })
      else {
        setRecord(data);
        setIsEditing(true);
      }
    } else {
      setRecord(undefined);
      setIsEditing(false);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const result = await fetch(`${AppConstants.apiSavingFund}/rates`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('jwt-token')}` },
        body: JSON.stringify(record)
      });
      
      if (!result.ok) throw new Error('Ocurrió un error al realizar la petición');

      const response = await result.json() as CommandResponseInfo;

      if (!response.successful) throw new Error(response.message);

      setRecord(undefined);
      setIsEditing(false);
      handleReload();
      pushNotification({ message: response.message, type: 'success' });
    } catch (err: any) {
      pushNotification({ message: err.message, type: 'danger' });
    }
  };

  const handleReload = () => {
    if (!hasError) fetchAnnualRates();
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
              <th>Tasa (%)</th>
              <th style={{ width: '80px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {annualRates !== undefined && annualRates?.length > 0 ? (
              annualRates.map((annualRate: SavingFundAnnualRateListSpec) => (
              <tr key={annualRate.id}>
                <td>{annualRate.id}</td>
                <td>{annualRate.year}</td>
                <td>
                  {isEditing && annualRate.id === record?.id ? (
                    <SFPercentageInput id={'saving-fund-annual-rate-id'} name={''} value={record.rate} onChange={(v) => setRecord({...record, rate: v })} isSmallInput={true} style={{ width: '80px' }} />
                  ): (
                    Number(annualRate.rate).toFixed(2)
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <EditInlineActionButton rowId={annualRate.id} onEditMode={(id, active) => handleEditMode(id, active)} onSaveClick={(v) => handleUpdate(v)} />
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={5} style={{textAlign: 'center'}}>No hay tasas de inter&eacute;s disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}