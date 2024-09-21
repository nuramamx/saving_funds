import { useEffect, useState } from 'react';
import { SFTabs, SFTabsOptions } from '../../../components/ui/sf-tabs';
import { useNavigate } from 'react-router-dom';
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
import useAssociateDraftStore from '../../../core/stores/associate-draft-store';
import AppConstants from '../../../core/constants/app-constants';
import SFSelectAgreement from '../../../components/dynamic-elements/sf-select-agreement';
import AssociateValidation from '../../../core/validations/associate-validation';
import { ZodIssue } from 'zod';
import IssueTransform from '../../../core/util/transforms/issue-transform';
import SFPercentageInput from '../../../components/form/sf-percentage-input';

export default function AssociateCreate() {
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
  const { pushNotification } = useNotificationStore();
  const { pushAssociateDraft } = useAssociateDraftStore();
  const { setValidationModal } = useValidationModalStore();
  const [issues, setIssues] = useState<ZodIssue[]>([]);
  const [beneficiaryTotalPercentage, setBeneficiaryTotalPercentage] = useState<number>(0);
  const tabsOptions: SFTabsOptions[] = [
    { id: 'associate', name: 'Socio' },
    { id: 'address', name: 'Localización' },
    { id: 'workplace', name: 'Centro de Trabajo' },
    { id: 'beneficiary', name: 'Beneficiarios' }
  ];

  const handleSave = async () => {
    if (!handleAssociateValidate()) return;

    try {
      const response = await fetch(`${AppConstants.apiAssociate}/create`, {
        method: 'POST',
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

      pushNotification({ message: 'Socio creado con éxito.', type: 'success' });
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
    setIssues([]);
  };

  useEffect(() => {
    const beneficiaryTotalPercentage = associate.beneficiaries
      .map(item => parseInt(item.percentage.toString()))
      .reduce((sum, percentage) => sum + percentage, 0);

      setBeneficiaryTotalPercentage(beneficiaryTotalPercentage);
  }, [associate.beneficiaries])

  return (
    <>
    <SFTabs options={tabsOptions}>
      <div id="associate">
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
            <SFMoneyInput id="associate-detail-fortnightlyContribution" name="Aportación Quincenal"
              value={associate.detail.fortnightlyContribution}
              onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, fortnightlyContribution: value }})}
              issues={issues} />
          </div>
        </div>
      </div>
      <div id="address">
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
      <div id="workplace">
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
      <div id="beneficiary">
        <div className="columns">
          <div className="column is-four-fifths">
            {associate.beneficiaries.map((beneficiary, index) => (
              <SFTextInput key={index} id={`associate-beneficiaries-${index}-name`} name={`Beneficiario ${index + 1}`}
                value={beneficiary.name}
                onChange={(value) => updateBeneficiaryName(index, value.toUpperCase())}
                issues={issues} />
            ))}
          </div>
          <div className="column">
            {associate.beneficiaries.map((beneficiary, index) => (
              <SFPercentageInput key={index} id={`associate-beneficiaries-${index}-percentage`} name="Porcentaje"
                value={beneficiary.percentage}
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