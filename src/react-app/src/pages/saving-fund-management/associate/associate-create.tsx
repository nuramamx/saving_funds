import { useEffect, useState } from 'react';
import { SFTabs, SFTabsOptions } from '../../../components/ui/sf-tabs';
import { useNavigate } from 'react-router-dom';
import SFTextInput from '../../../components/form/sf-text-input';
import SFMoneyInput from '../../../components/form/sf-money-input';
import SFSelectInput from '../../../components/form/sf-select-input';
import SFPercentageInput from '../../../components/form/sf-percentage-input';
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
  const [beneficiaryTotalPercentage, setBeneficiaryTotalPercentage] = useState<number>(0);
  const tabsOptions: SFTabsOptions[] = [
    { id: 'associate', name: 'Socio' },
    { id: 'address', name: 'Localización' },
    { id: 'workplace', name: 'Centro de Trabajo' },
    { id: 'beneficiary', name: 'Beneficiarios' }
  ];

  const draft = () => {
    pushAssociateDraft(associate);
    pushNotification({ message: 'Borrador guardado correctamente.', type: 'info' });
  };

  const save = async () => {
    try {
      const response = await fetch(`${AppConstants.apiAssociate}/create`, {
        method: 'POST',
        body: JSON.stringify(associate)
      });

      if (!response.ok) {
        const error = await response.json() as CommandResponseInfo;

        console.log(error);

        return setValidationModal({
          message: error.message,
          show: true,
          errors: error.errors,
          data: error.data
        });
      }

      pushNotification({ message: 'Socio creado con éxito.', type: 'success' });
      navigate('/savingfunds/associate/list');
    } catch (error: any) {
      pushNotification({ message: error.message, type: 'danger' });
    }
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
            <SFTextInput id="associate_firstname" name="Nombre"
              value={associate.name.firstname}
              onChange={(value) => setAssociate({ ...associate, name: { ...associate.name, firstname: value.toUpperCase() }})} />
            <SFTextInput id="associate_middlename" name="Segundo Nombre"
              value={associate.name.middlename}
              onChange={(value) => setAssociate({ ...associate, name: { ...associate.name, middlename: value.toUpperCase() }})} />
            <SFTextInput id="associate_paternal_lastname" name="Apellido Paterno"
              value={associate.name.paternalLastname}
              onChange={(value) => setAssociate({ ...associate, name: { ...associate.name, paternalLastname: value.toUpperCase() }})} />
            <SFTextInput id="associate_maternal_lastname" name="Apellido Materno"
              value={associate.name.maternalLastname}
              onChange={(value) => setAssociate({ ...associate, name: { ...associate.name, maternalLastname: value.toUpperCase() }})} />
            <SFTextInput id="associate_rfc" name="R.F.C."
              value={associate.rfc}
              onChange={(value) => setAssociate({ ...associate, rfc: value.toUpperCase() })} />
            <SFSelectInput id="associate_gender" name="Sexo"
              value={associate.gender}
              options={([ { key: '-', value: '---'}, { key: 'M', value: 'MASCULINO'}, { key: 'F', value: 'FEMENINO' }])}
              onChange={(value) => setAssociate({ ...associate, gender: value.toUpperCase() })} />
          </div>
          <div className="column">
            <SFTextInput id="associate_dependency_key" name="Clave de Dependencia"
              value={associate.detail.dependencyKey}
              onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, dependencyKey: value.toUpperCase() }})} />
            <SFSelectAgreement id="associate_agreement" name="Convenio"
              value={associate.detail.agreementId}
              onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, agreementId: value }})} />
            <SFTextInput id="associate_category" name="Categoría"
              value={associate.detail.category}
              onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, category: value.toUpperCase() }})} />
            <SFMoneyInput id="associate_salary" name="Sueldo / Pensión"
              value={associate.detail.salary}
              onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, salary: value }})} />
            <SFMoneyInput id="associate_social_contribution" name="Aportación Social"
              value={associate.detail.socialContribution}
              onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, socialContribution: value }})} />
            <SFMoneyInput id="associate_fortnighly_contribution" name="Aportación Quincenal"
              value={associate.detail.fortnightlyContribution}
              onChange={(value) => setAssociate({ ...associate, detail: { ...associate.detail, fortnightlyContribution: value }})} />
          </div>
        </div>
      </div>
      <div id="address">
        <div className="columns">
          <div className="column">
            <SFTextInput id="address_street" name="Calle y N&uacute;mero"
              value={associate.address.street}
              onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, street: value.toUpperCase() }})} />
            <SFTextInput id="address_settlement" name="Colonia"
              value={associate.address.settlement}
              onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, settlement: value.toUpperCase() }})} />
            <SFTextInput id="address_town" name="Localidad"
              value={associate.address.town}
              onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, town: value.toUpperCase() }})} />
            <SFTextInput id="address_postal_code" name="C&oacute;digo Postal"
              value={associate.address.postalCode}
              onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, postalCode: value.toUpperCase() }})} />
            <SFSelectState id="address_state_id" name="Estado"
              value={stateId}
              onChange={(value) => setStateId(value)} />
            <SFSelectCity id="address_city_id" name="Ciudad"
              value={associate.address.cityId}
              stateId={stateId}
              onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, cityId: value }})} />
          </div>
          <div className="column">
            <SFTextInput id="address_phone" name="Tel&eacute;fono"
              value={associate.address.phone}
              onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, phone: value.toUpperCase() }})} />
            <SFTextInput id="address_mobile" name="Celular"
              value={associate.address.mobile}
              onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, mobile: value.toUpperCase() }})} />
            <SFTextInput id="address_email" name="Email"
              value={associate.address.email}
              onChange={(value) => setAssociate({ ...associate, address: { ...associate.address, email: value.toUpperCase() }})} />
          </div>
        </div>
      </div>
      <div id="workplace">
        <div className="columns">
          <div className="column">
            <SFTextInput id="workplace_key" name="Clave de Centro de Trabajo"
              value={associate.workplace.key}
              onChange={(value) => setAssociate({ ...associate, workplace: { ...associate.workplace, key: value.toUpperCase() }})} />
            <SFTextInput id="workplace_name" name="Centro de Trabajo / Instituci&oacute;n"
              value={associate.workplace.name}
              onChange={(value) => setAssociate({ ...associate, workplace: { ...associate.workplace, name: value.toUpperCase() }})} />
            <SFTextInput id="workplace_phone" name="Tel&eacute;fono"
              value={associate.workplace.phone}
              onChange={(value) => setAssociate({ ...associate, workplace: { ...associate.workplace, phone: value.toUpperCase() }})} />
          </div>
          <div className="column"></div>
        </div>
      </div>
      <div id="beneficiary">
        <div className="columns">
          <div className="column is-four-fifths">
            {associate.beneficiaries.map((beneficiary, index) => (
              <SFTextInput key={index} id={`beneficiary_${index+1}`} name={`Beneficiario ${index+1}`}
                value={beneficiary.name}
                onChange={(value) => updateBeneficiaryName(index, value.toUpperCase())} />
            ))}
          </div>
          <div className="column">
            {associate.beneficiaries.map((beneficiary, index) => (
              <SFPercentageInput key={index} id={`beneficiary_percentage_${index + 1}`} name="Porcentaje"
                min={0} max={100}
                value={beneficiary.percentage}
                onChange={(value) => updateBeneficiaryPercentage(index, value)} />
            ))}
            <SFTextDisplayInput key="beneficiary_percentage_summarized" id="beneficiary_percentage_summarized" name="Total Cubierto"
              display="%"
              readonly={true}
              value={beneficiaryTotalPercentage.toString()} />
          </div>
        </div>
      </div>
    </SFTabs>
    <div className="mt-auto">
      <nav className="level">
        <div className="level-left"></div>
        <div className="level-right">
          <div className="level-item">
            <button className="button is-light" onClick={() => clearAssociate()}>Limpiar</button>
          </div>
          <div className="level-item">
            <button className="button is-light" onClick={() => draft()}>Borrador</button>
          </div>
          <div className="level-item">
          <button className="button is-primary" onClick={() => save()}>Guardar</button>
          </div>
        </div>
      </nav>
    </div>
    </>
  );
}