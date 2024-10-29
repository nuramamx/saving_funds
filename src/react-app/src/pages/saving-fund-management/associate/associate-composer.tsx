import { useEffect, useState } from 'react';
import { SFTabs, SFTabsOptions } from '../../../components/ui/sf-tabs';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ZodIssue } from 'zod';
import SFTextInput from '../../../components/form/sf-text-input';
import SFMoneyInput from '../../../components/form/sf-money-input';
import SFSelectInput from '../../../components/form/sf-select-input';
import SFTextDisplayInput from '../../../components/form/sf-text-display-input';
import useNotificationStore from '../../../core/stores/notification-store';
import useAssociateStore from '../../../core/stores/associate-store';
import CommandResponseInfo from '../../../core/interfaces/info/command-response-info';
import useValidationModalStore from '../../../core/stores/validation-modal-store';
import SFSelectCity from '../../../components/dynamic-elements/sf-select-city';
import SFSelectState from '../../../components/dynamic-elements/sf-select-state';
import AppConstants from '../../../core/constants/app-constants';
import SFSelectAgreement from '../../../components/dynamic-elements/sf-select-agreement';
import AssociateValidation from '../../../core/validations/associate-validation';
import IssueTransform from '../../../core/util/transforms/issue-transform';
import SFPercentageInput from '../../../components/form/sf-percentage-input';
import AssociateSpec from '../../../core/interfaces/specs/base/associate-spec';
import { objectToCamel } from 'ts-case-convert';
import useAuthStore from '../../../core/stores/auth-store';

type AssociateComposerParams = {
  id?: number
}

export const associateComposerLoader = async ({ params }: { params: AssociateComposerParams }) => {
  const { id } = params;
  return { id: id || null };
};

export function AssociateComposer() {
  const {
    associate,
    stateId,
    setAssociate,
    setStateId,
    updateBeneficiaryName,
    updateBeneficiaryPercentage,
    clearAssociate
  } = useAssociateStore();
  const navigate = useNavigate();
  const { id } = useLoaderData() as { id?: number };
  const { pushNotification } = useNotificationStore();
  const { setValidationModal } = useValidationModalStore();
  const { token, user } = useAuthStore();
  const [issues, setIssues] = useState<ZodIssue[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [beneficiaryTotalPercentage, setBeneficiaryTotalPercentage] = useState<number>(0);
  const tabsOptions: SFTabsOptions[] = [
    { id: 'associate', name: 'Socio' },
    { id: 'address', name: 'Localización' },
    { id: 'workplace', name: 'Centro de Trabajo' },
    { id: 'beneficiary', name: 'Beneficiarios' }
  ];

  const fetchAssociate = async () => {
    const result = await fetch(`${AppConstants.apiAssociate}/${id}`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!result.ok)
      throw new Error(result.statusText);

    const response = await result.json() as CommandResponseInfo;
    const associate = objectToCamel(response.data) as unknown as AssociateSpec;
    setAssociate(associate);
    setStateId(associate.address.stateId);
  };

  const handleSave = async () => {
    if (!handleAssociateValidate()) return;

    try {
      const response = await fetch(`${AppConstants.apiAssociate}/${!editMode ? 'create' : 'update' }`, {
        method: !editMode ? 'POST' : 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(associate)
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

      pushNotification({ message: `Socio ${!editMode ? 'creado' : 'actualizado'} con éxito.`, type: 'success' });
      navigate('/savingfund/associate/list');
    } catch (error: any) {
      pushNotification({ message: error.message, type: 'danger' });
    }
  };

  const handleAssociateValidate = (): boolean => {
    const result = AssociateValidation.safeParse(associate);

    if (!result.success) {
      pushNotification({
        message: `Favor de revisar los campos requeridos.`,
        type: 'danger'
      });

      setIssues(IssueTransform('associate', result.error.issues));      
    }

    return result.success;
  };

  const handleClear = () => {
    clearAssociate();
    setEditMode(false);
    setIssues([]);
  };

  const handleCancel = () => {
    handleClear();
    navigate('/savingfund/associate/list');
  }

  useEffect(() => {
    if (id !== null && id !== undefined && id > 0) {
      setEditMode(true);
      fetchAssociate();
    } else {
      handleClear();
    }
  }, [id]); 

  useEffect(() => {
    const beneficiaryTotalPercentage = associate.beneficiaries
      .map(item => parseInt(item.percentage.toString()))
      .reduce((sum, percentage) => sum + percentage, 0);

      setBeneficiaryTotalPercentage(beneficiaryTotalPercentage);
  }, [associate.beneficiaries]);

  return (
    <div>
      <SFTabs options={tabsOptions}>
        <div id="associate" data-tg-tour="Datos generales del socio.">
          <div className="columns">
            <div className="column">
              <SFTextInput id="associate-name" name="Nombre"
                value={associate.name}
                onChange={(value) => setAssociate({ ...associate, name: value.toUpperCase() })}
                issues={issues} />
              <SFTextInput id="associate-rfc" name="R.F.C."
                value={associate.rfc}
                onChange={(value) => setAssociate({ ...associate, rfc: value.toUpperCase() })}
                issues={issues} />
              <SFSelectInput id="associate-gender" name="Sexo"
                value={associate.gender}
                options={([ { key: '-', value: '---'}, { key: 'MASCULINO', value: 'M'}, { key: 'FEMENINO', value: 'F' }])}
                onChange={(value) => setAssociate({ ...associate, gender: value.toUpperCase() })}
                issues={issues} />
              <SFTextInput id="associate-detail-dependencyKey" name="Clave de Dependencia"
                value={associate.detail.dependencyKey}
                onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, dependencyKey: value.toUpperCase() }})}
                issues={issues} />
              <SFSelectAgreement id="associate-detail-agreementId" name="Convenio"
                value={associate.detail.agreementId}
                onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, agreementId: value }})}
                issues={issues} />
              <SFTextInput id="associate-detail-category" name="Categoría"
                value={associate.detail.category}
                onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, category: value.toUpperCase() }})}
                issues={issues} />
            </div>
            <div className="column">
              <SFMoneyInput id="associate-detail-salary" name="Sueldo / Pensión"
                value={associate.detail.salary}
                onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, salary: value }})}
                issues={issues} />
              <SFMoneyInput id="associate-detail-socialContribution" name="Aportación Social"
                value={associate.detail.socialContribution}
                onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, socialContribution: value }})}
                issues={issues} />
              <SFMoneyInput id="associate-detail-fortnightlyContribution" name="Aportación Frecuente"
                value={associate.detail.frequentContribution}
                onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, frequentContribution: value }})}
                issues={issues} />

              {editMode && (
                <>
                <br />
                <img className="is-pulled-right" src={`${process.env.PUBLIC_URL}/associates/${associate.rfc.trim()}.png`} style={{ width: '150px', height: '150px' }} />
                </>
              )}
            </div>
          </div>
        </div>
        <div id="address" data-tg-tour="Datos de localización del socio.">
          <div className="columns">
            <div className="column">
              <SFTextInput id="associate-address-street" name="Calle y N&uacute;mero"
                value={associate.address.street}
                onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, street: value.toUpperCase() }})}
                issues={issues} />
              <SFTextInput id="associate-address-settlement" name="Colonia"
                value={associate.address.settlement}
                onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, settlement: value.toUpperCase() }})}
                issues={issues} />
              <SFTextInput id="associate-address-town" name="Localidad"
                value={associate.address.town}
                onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, town: value.toUpperCase() }})}
                issues={issues} />
              <SFTextInput id="associate-address-postalCode" name="C&oacute;digo Postal"
                value={associate.address.postalCode}
                onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, postalCode: value.toUpperCase() }})}
                issues={issues} />
              <SFSelectState id="associate-address-stateId" name="Estado"
                value={stateId}
                onChange={(value) => setStateId(value)} />
              <SFSelectCity id="associate-address-cityId" name="Ciudad"
                value={associate.address.cityId}
                stateId={stateId}
                onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, cityId: value }})}
                issues={issues} />
            </div>
            <div className="column">
              <SFTextInput id="associate-address-phone" name="Tel&eacute;fono"
                value={associate.address.phone}
                onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, phone: value.toUpperCase() }})}
                issues={issues} />
              <SFTextInput id="associate-address-mobile" name="Celular"
                value={associate.address.mobile}
                onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, mobile: value.toUpperCase() }})}
                issues={issues} />
              <SFTextInput id="associate-address-email" name="Email"
                value={associate.address.email}
                onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, email: value.toUpperCase() }})}
                issues={issues} />
            </div>
          </div>
        </div>
        <div id="workplace" data-tg-tour="Datos del lugar de trabajo del socio.">
          <div className="columns">
            <div className="column">
              <SFTextInput id="associate-workplace-key" name="Clave de Centro de Trabajo"
                value={associate.workplace.key}
                onChange={(value) => setAssociate({ ...associate, workplace: { ...associate.workplace, key: value.toUpperCase() }})}
                issues={issues} />
              <SFTextInput id="associate-workplace-name" name="Centro de Trabajo / Instituci&oacute;n"
                value={associate.workplace.name}
                onChange={(value) => setAssociate({ ...associate, workplace: { ...associate.workplace, name: value.toUpperCase() }})}
                issues={issues} />
              <SFTextInput id="associate-workplace-phone" name="Tel&eacute;fono"
                value={associate.workplace.phone}
                onChange={(value) => setAssociate({ ...associate, workplace: { ...associate.workplace, phone: value.toUpperCase() }})}
                issues={issues} />
            </div>
            <div className="column"></div>
          </div>
        </div>
        <div id="beneficiary" data-tg-tour="Datos de los beneficiarios del socio.">
          <div className="columns">
            <div className="column is-four-fifths">
              {associate.beneficiaries.map((beneficiary, index) => (
                <SFTextInput key={index} id={`associate-beneficiaries-${index}-name`} name={`Beneficiario ${index + 1}`}
                  value={beneficiary.name}
                  readonly={user.role === 'ADMIN' ? false : true}
                  onChange={(value) => updateBeneficiaryName(index, value.toUpperCase())}
                  issues={issues} />
              ))}
            </div>
            <div className="column" data-tg-tour="El porcentaje debe cumplir el 100%.">
              {associate.beneficiaries.map((beneficiary, index) => (
                <SFPercentageInput key={index} id={`associate-beneficiaries-${index}-percentage`} name="Porcentaje"
                  value={beneficiary.percentage}
                  readonly={user.role === 'ADMIN' ? false : true}
                  onChange={(value) => updateBeneficiaryPercentage(index, value)}
                  issues={issues} />
              ))}
              <SFTextDisplayInput id="associate-beneficiaries-summarized" key="associate-beneficiary-percentage-summarized"  name="Total Cubierto"
                display="%"
                readonly={true}
                value={beneficiaryTotalPercentage.toString()}
                issues={issues} />
            </div>
          </div>
        </div>
      </SFTabs>
      <div className="mt-auto" style={{ display: user.role === 'ADMIN' ? 'block' : 'none'}}>
        <nav className="level">
          <div className="level-left"></div>
          <div className="level-right">
            {!editMode && (<div className="level-item">
              <button className="button is-light" onClick={() => handleClear()}>Limpiar</button>
            </div>)}
            {editMode && (<div className="level-item">
              <button className="button is-light" onClick={() => handleCancel()}>Cancelar</button>
            </div>)}
            <div className="level-item">
            <button className="button is-primary" onClick={() => handleSave()}>Guardar</button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export type { AssociateComposerParams };