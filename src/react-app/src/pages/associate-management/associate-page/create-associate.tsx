import { useContext, useEffect, useState } from "react";
import { AssociatePageContext } from "./associate-page";
import { SFTabs, SFTabsOptions } from "../../../components/ui/sf-tabs";
import SFTextInput from "../../../components/form/sf-text-input";
import SFMoneyInput from "../../../components/form/sf-money-input";
import SFSelectInput from "../../../components/form/sf-select-input";
import SFPercentageInput from "../../../components/form/sf-percentage-input";
import IpcRenderer from "../../../util/ip-renderer";
import CommandHandlerMediator from "../../../core/application/mediators/command-handler-mediator";
import CommandResponse from "../../../core/abstractions/interfaces/command-response";
import NameInfo from "../../../core/domain/interfaces/name-info";
import AssociateDetailInfo from "../../../core/domain/interfaces/associate-detail-info";
import AddressInfo from "../../../core/domain/interfaces/address-info";
import WorkplaceInfo from "../../../core/domain/interfaces/workplace-info";
import BeneficiaryInfo from "../../../core/domain/interfaces/beneficiary-info";
import Associate from "../../../core/domain/entities/associate";
import Address from "../../../core/domain/entities/address";
import AssociateDetail from "../../../core/domain/entities/associate-detail";
import Workplace from "../../../core/domain/entities/workplace";
import SFTextDisplayInput from "../../../components/form/sf-text-display-input";
import useNotificationStore from "../../../core/infrastructure/stores/notification-store";

const ipcRenderer = IpcRenderer();

export default function CreateAssociate() {
  const { pushNotification } = useNotificationStore();
  const command = useContext(AssociatePageContext) as CommandHandlerMediator;
  const [commandResult, setCommandResult] = useState<CommandResponse>({ successful: false } as CommandResponse);

  const [generalInfo, setGeneralInfo] = useState<({rfc: string, gender: string})>({ rfc: '', gender: 'M' });
  const [fullnameInfo, setFullnameInfo] = useState<NameInfo>({ firstname: '', middlename: '', paternal_lastname: '', maternal_lastname: '' });
  const [detailInfo, setDetailInfo] = useState<AssociateDetailInfo>({
    dependency_key: '',
    agreement: '',
    category: '',
    salary: 0,
    social_contribution: 0,
    fortnightly_contribution: 0,
    request_date: undefined!
  });
  const [addressInfo, setAddressInfo] = useState<AddressInfo>({
    city_id: 0,
    street: '',
    settlement: '',
    town: '',
    postal_code: '',
    phone: '',
    mobile: '',
    email: ''
  });
  const [workplaceInfo, setWorkplaceInfo] = useState<WorkplaceInfo>({
    key: '',
    name: '',
    phone: ''
  });
  const [beneficiaryInfo, setBeneficiaryInfo] = useState<BeneficiaryInfo[]>([
    { name: '', percentage: 0 },
    { name: '', percentage: 0 },
    { name: '', percentage: 0 },
    { name: '', percentage: 0 },
    { name: '', percentage: 0 }
  ]);
  const [beneficiaryTotalPercentage, setBeneficiaryTotalPercentage] = useState<number>(0);
  const tabsOptions: SFTabsOptions[] = [
    { id: 'associate', name: "Socio" },
    { id: 'address', name: "Localización" },
    { id: 'workplace', name: "Centro de Trabajo" },
    { id: 'beneficiary', name: "Beneficiarios" }
  ];

  useEffect(() => {
    const beneficiaryTotalPercentage = beneficiaryInfo
      .map(item => parseInt(item.percentage.toString()))
      .reduce((sum, percentage) => sum + percentage, 0);

      console.log(`Hola => ${beneficiaryTotalPercentage}`);

      setBeneficiaryTotalPercentage(beneficiaryTotalPercentage);
  }, [beneficiaryInfo])

  const handleBeneficiaryNameChange = (index: number, name: string) => {
    setBeneficiaryInfo((prevState: BeneficiaryInfo[]) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], name: name };
      return newState;
    });
  };

  const handleBeneficiaryPercentageChange = (index: number, percentage: number) => {
    setBeneficiaryInfo((prevState: BeneficiaryInfo[]) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], percentage: percentage };
      return newState;
    });
  };

  const executeCommand = () => {
    try {
      const associate = new Associate(fullnameInfo, generalInfo.rfc, generalInfo.gender)
        .updateAddress(new Address(addressInfo))
        .updateDetail(new AssociateDetail(
          detailInfo.dependency_key,
          detailInfo.agreement,
          detailInfo.category,
          detailInfo.salary,
          detailInfo.social_contribution,
          detailInfo.fortnightly_contribution,
          detailInfo.request_date
        ))
        .updateWorkplace(new Workplace(workplaceInfo.key, workplaceInfo.name, workplaceInfo.phone))
        .addBeneficiaries(beneficiaryInfo);

    } catch (error: any) {
      pushNotification({ message: error.message, type: "danger" });
    }
  };

  return (
    <>
    <SFTabs options={tabsOptions}>
      <div id="associate">
        <div className="columns">
          <div className="column">
            <SFTextInput id="associate_firstname" name="Nombre"
              value={fullnameInfo.firstname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, firstname: e.target.value })} />
            <SFTextInput id="associate_middlename" name="Segundo Nombre"
              value={fullnameInfo.middlename}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, middlename: e.target.value })} />
            <SFTextInput id="associate_paternal_lastname" name="Apellido Paterno"
              value={fullnameInfo.paternal_lastname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, paternal_lastname: e.target.value })} />
            <SFTextInput id="associate_maternal_lastname" name="Apellido Materno"
              value={fullnameInfo.maternal_lastname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, maternal_lastname: e.target.value })} />
            <SFTextInput id="associate_rfc" name="R.F.C."
              value={generalInfo.rfc}
              onChange={(e) => setGeneralInfo({ ...generalInfo, rfc: e.target.value })} />
            <SFSelectInput id="associate_gender" name="Sexo"
              value={generalInfo.gender}
              options={([ { key: 'M', value: 'Masculino'}, { key: 'F', value: 'Femenino' }])}
              onChange={(e) => setGeneralInfo({ ...generalInfo, gender: e.target.value })} />
          </div>
          <div className="column">
            <SFTextInput id="associate_dependency_key" name="Clave de Dependencia"
              value={detailInfo.dependency_key}
              onChange={(e) => setDetailInfo({ ...detailInfo, dependency_key: e.target.value })} />
            <SFTextInput id="associate_agreement" name="Convenio"
              value={detailInfo.agreement}
              onChange={(e) => setDetailInfo({ ...detailInfo, agreement: e.target.value })} />
            <SFTextInput id="associate_category" name="Categoría"
              value={detailInfo.category}
              onChange={(e) => setDetailInfo({ ...detailInfo, category: e.target.value })} />
            <SFMoneyInput id="associate_salary" name="Sueldo / Pensión"
              value={detailInfo.salary}
              onChange={(value) => setDetailInfo({ ...detailInfo, salary: value })} />
            <SFMoneyInput id="associate_social_contribution" name="Aportación Social"
              value={detailInfo.social_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, social_contribution: value })} />
            <SFMoneyInput id="associate_fortnighly_contribution" name="Aportación Quincenal"
              value={detailInfo.fortnightly_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, fortnightly_contribution: value })} />
          </div>
        </div>
      </div>
      <div id="address">
        <div className="columns">
          <div className="column">
            <SFTextInput id="address_street" name="Calle y N&uacute;mero"
              value={addressInfo.street}
              onChange={(e) => setAddressInfo({ ...addressInfo, street: e.target.value })} />
            <SFTextInput id="address_settlement" name="Colonia"
              value={addressInfo.settlement}
              onChange={(e) => setAddressInfo({ ...addressInfo, settlement: e.target.value })} />
            <SFTextInput id="address_town" name="Localidad"
              value={addressInfo.town}
              onChange={(e) => setAddressInfo({ ...addressInfo, town: e.target.value })} />
            <SFTextInput id="address_dependency_key" name="C&oacute;digo Postal"
              value={addressInfo.postal_code}
              onChange={(e) => setAddressInfo({ ...addressInfo, postal_code: e.target.value })} />
          </div>
          <div className="column">
            <SFTextInput id="address_city_id" name="Ciudad"
              value={addressInfo.city_id.toString()}
              onChange={(e) => setAddressInfo({ ...addressInfo, city_id: e.target.value })} />
            <SFTextInput id="address_phone" name="Tel&eacute;fono"
              value={addressInfo.phone}
              onChange={(e) => setAddressInfo({ ...addressInfo, phone: e.target.value })} />
            <SFTextInput id="address_mobile" name="Celular"
              value={addressInfo.mobile}
              onChange={(e) => setAddressInfo({ ...addressInfo, mobile: e.target.value })} />
            <SFTextInput id="address_email" name="Email"
              value={addressInfo.email}
              onChange={(e) => setAddressInfo({ ...addressInfo, email: e.target.value })} />
          </div>
        </div>
      </div>
      <div id="workplace">
        <div className="columns">
          <div className="column">
            <SFTextInput id="workplace_key" name="Clave de Centro de Trabajo"
              value={workplaceInfo.key}
              onChange={(e) => setWorkplaceInfo({ ...workplaceInfo,  key: e.target.value })} />
            <SFTextInput id="workplace_name" name="Centro de Trabajo / Instituci&oacute;n"
              value={workplaceInfo.name}
              onChange={(e) => setWorkplaceInfo({ ...workplaceInfo, name: e.target.value })} />
            <SFTextInput id="workplace_phone" name="Tel&eacute;fono"
              value={workplaceInfo.phone}
              onChange={(e) => setWorkplaceInfo({ ...workplaceInfo, phone: e.target.value })} />
          </div>
          <div className="column"></div>
        </div>
      </div>
      <div id="beneficiary">
        <div className="columns">
          <div className="column is-four-fifths">
              {beneficiaryInfo.map((beneficiary, index) => (
                <SFTextInput key={index} id={`beneficiary_${index+1}`} name={`Beneficiario ${index+1}`}
                  value={beneficiaryInfo[index].name}
                  onChange={(e) => handleBeneficiaryNameChange(index, e.target.value)} />
              ))}
          </div>
          <div className="column">
            {beneficiaryInfo.map((beneficiary, index) => (
              <SFPercentageInput key={index} id={`beneficiary_percentage_${index + 1}`} name="Porcentaje"
                min={0} max={100}
                value={beneficiaryInfo[index].percentage}
                onChange={(value) => handleBeneficiaryPercentageChange(index, value)} />
            ))}
              <SFTextDisplayInput key="beneficiary_percentage_summarized" id="beneficiary_percentage_summarized" name="Total Cubierto"
                display="%"
                readonly={true}
                value={beneficiaryTotalPercentage.toString()} />
          </div>
        </div>
      </div>
    </SFTabs>
    <button className="button is-primary" onClick={() => executeCommand()}>
      Guardar
    </button>
    </>
  );
}