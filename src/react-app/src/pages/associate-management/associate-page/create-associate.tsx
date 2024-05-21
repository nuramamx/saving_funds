import { useContext, useState } from "react";
import { AssociatePageContext } from "./associate-page";
import CommandHandlerMediator from "../../../core/application/mediators/command-handler-mediator";
import CommandResponse from "../../../core/abstractions/interfaces/command-response";
import { SFTabs, SFTabsOptions } from "../../../components/ui/sf-tabs";
import SFFlatInput from "../../../components/form/sf-flat-input";
import SFMoneyInput from "../../../components/form/sf-money-input";
import NameInfo from "@core/domain/interfaces/name-info";
import AssociateDetailInfo from "@core/domain/interfaces/associate-detail-info";
import IpcRenderer from "../../../util/ip-renderer";
import SFSelectInput from "../../../components/form/sf-select-input";
import AddressInfo from "@core/domain/interfaces/address-info";

const ipcRenderer = IpcRenderer();

export default function CreateAssociate() {
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
  
  const tabsOptions: SFTabsOptions[] = [
    { id: 'associate', name: "Socio" },
    { id: 'address', name: "Localización" },
    { id: 'workplace', name: "Centro de Trabajo" },
    { id: 'beneficiary', name: "Beneficiarios" }
  ];

  const executeCommand = () => {
    console.log(detailInfo.salary);
  };

  return (
    <>
    <SFTabs options={tabsOptions}>
      <div id="associate">
        <div className="columns">
          <div className="column">
            <SFFlatInput id="firstname" name="Nombre"
              value={fullnameInfo.firstname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, firstname: e.target.value })} />
            <SFFlatInput id="middlename" name="Segundo Nombre"
              value={fullnameInfo.middlename}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, middlename: e.target.value })} />
            <SFFlatInput id="paternal_lastname" name="Apellido Paterno"
              value={fullnameInfo.paternal_lastname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, paternal_lastname: e.target.value })} />
            <SFFlatInput id="maternal_lastname" name="Apellido Materno"
              value={fullnameInfo.maternal_lastname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, maternal_lastname: e.target.value })} />
            <SFFlatInput id="rfc" name="R.F.C."
              value={generalInfo.rfc}
              onChange={(e) => setGeneralInfo({ ...generalInfo, rfc: e.target.value })} />
            <SFSelectInput id="gender" name="Sexo"
              value={generalInfo.gender}
              options={([ { key: 'M', value: 'Masculino'}, { key: 'F', value: 'Femenino' }])}
              onChange={(e) => setGeneralInfo({ ...generalInfo, gender: e.target.value })} />
          </div>
          <div className="column">
            <SFFlatInput id="dependency_key" name="Clave de Dependencia"
              value={detailInfo.dependency_key}
              onChange={(e) => setDetailInfo({ ...detailInfo, dependency_key: e.target.value })} />
            <SFFlatInput id="agreement" name="Convenio"
              value={detailInfo.agreement}
              onChange={(e) => setDetailInfo({ ...detailInfo, agreement: e.target.value })} />
            <SFFlatInput id="category" name="Categoría"
              value={detailInfo.category}
              onChange={(e) => setDetailInfo({ ...detailInfo, category: e.target.value })} />
            <SFMoneyInput id="salary" name="Sueldo / Pensión"
              value={detailInfo.salary}
              onChange={(value) => setDetailInfo({ ...detailInfo, salary: value })} />
            <SFMoneyInput id="social_contribution" name="Aportación Social"
              value={detailInfo.social_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, social_contribution: value })} />
            <SFMoneyInput id="fortnighly_contribution" name="Aportación Quincenal"
              value={detailInfo.fortnightly_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, fortnightly_contribution: value })} />
          </div>
        </div>
      </div>
      <div id="address">
        <div className="columns">
          <div className="column">
            <SFFlatInput id="street" name="Calle y N&uacute;mero"
              value={addressInfo.street}
              onChange={(e) => setAddressInfo({ ...addressInfo, street: e.target.value })} />
            <SFFlatInput id="settlement" name="Colonia"
              value={addressInfo.settlement}
              onChange={(e) => setAddressInfo({ ...addressInfo, settlement: e.target.value })} />
            <SFFlatInput id="town" name="Localidad"
              value={addressInfo.town}
              onChange={(e) => setAddressInfo({ ...addressInfo, town: e.target.value })} />
            <SFFlatInput id="dependency_key" name="C&oacute;digo Postal"
              value={addressInfo.postal_code}
              onChange={(e) => setAddressInfo({ ...addressInfo, postal_code: e.target.value })} />
          </div>
          <div className="column">
            <SFFlatInput id="agreement" name="Ciudad"
              value={addressInfo.city_id.toString()}
              onChange={(e) => setAddressInfo({ ...addressInfo, city_id: e.target.value })} />
            <SFFlatInput id="category" name="Tel&eacute;fono"
              value={addressInfo.phone}
              onChange={(e) => setAddressInfo({ ...addressInfo, phone: e.target.value })} />
            <SFFlatInput id="category" name="Celular"
              value={addressInfo.mobile}
              onChange={(e) => setAddressInfo({ ...addressInfo, mobile: e.target.value })} />
            <SFFlatInput id="category" name="Email"
              value={addressInfo.email}
              onChange={(e) => setAddressInfo({ ...addressInfo, email: e.target.value })} />
          </div>
        </div>
      </div>
      <div id="workplace">
        <div className="columns">
          <div className="column">
            <SFFlatInput id="street" name="Clave de Centro de Trabajo"
              value={fullnameInfo.firstname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo,  firstname: e.target.value })} />
            <SFFlatInput id="settlement" name="Centro de Trabajo / Instituci&oacute;n"
              value={fullnameInfo.middlename}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, middlename: e.target.value })} />
            <SFFlatInput id="town" name="Tel&eacute;fono"
              value={fullnameInfo.paternal_lastname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, paternal_lastname: e.target.value })} />
          </div>
          <div className="column"></div>
        </div>
      </div>
      <div id="beneficiary">
        <div className="columns">
          <div className="column is-four-fifths">
            <SFFlatInput id="street" name="Beneficiario 1"
              value={fullnameInfo.firstname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo,  firstname: e.target.value })} />
            <SFFlatInput id="settlement" name="Beneficiario 2"
              value={fullnameInfo.middlename}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, middlename: e.target.value })} />
            <SFFlatInput id="town" name="Beneficiario 3"
              value={fullnameInfo.paternal_lastname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, paternal_lastname: e.target.value })} />
            <SFFlatInput id="town" name="Beneficiario 4"
              value={fullnameInfo.paternal_lastname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, paternal_lastname: e.target.value })} />
            <SFFlatInput id="town" name="Beneficiario 5"
              value={fullnameInfo.paternal_lastname}
              onChange={(e) => setFullnameInfo({ ...fullnameInfo, paternal_lastname: e.target.value })} />
          </div>
          <div className="column">
            <SFMoneyInput id="fortnighly_contribution" name="Porcentaje"
              value={detailInfo.fortnightly_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, fortnightly_contribution: value })} />
            <SFMoneyInput id="fortnighly_contribution" name="Porcentaje"
              value={detailInfo.fortnightly_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, fortnightly_contribution: value })} />
            <SFMoneyInput id="fortnighly_contribution" name="Porcentaje"
              value={detailInfo.fortnightly_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, fortnightly_contribution: value })} />
            <SFMoneyInput id="fortnighly_contribution" name="Porcentaje"
              value={detailInfo.fortnightly_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, fortnightly_contribution: value })} />
            <SFMoneyInput id="fortnighly_contribution" name="Porcentaje"
              value={detailInfo.fortnightly_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, fortnightly_contribution: value })} />
            <SFMoneyInput id="fortnighly_contribution" name="Total Cubierto"
              value={detailInfo.fortnightly_contribution}
              onChange={(value) => setDetailInfo({ ...detailInfo, fortnightly_contribution: value })} />
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