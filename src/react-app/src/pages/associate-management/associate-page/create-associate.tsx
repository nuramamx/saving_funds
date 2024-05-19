import { useContext, useState } from "react";
import { AssociatePageContext } from "./associate-page";
import CommandHandlerMediator from "../../../core/application/mediators/command-handler-mediator";
import CommandResponse from "../../../core/abstractions/interfaces/command-response";
import { SFTabs, SFTabsOptions } from "../../../components/sf-tabs";
import SFFlatInput from "../../../components/form/sf-flat-input";
import SFMoneyInput from "../../../components/form/sf-money-input";
import NameInfo from "@core/domain/interfaces/name-info";
import AssociateDetailInfo from "@core/domain/interfaces/associate-detail-info";
import IpcRenderer from "../../../util/ip-renderer";
import SFSelectInput from "../../../components/form/sf-select-input";

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
                            onChange={(e) => setFullnameInfo({ ...fullnameInfo,  firstname: e.target.value })} />
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
                Address
            </div>
            <div id="workplace">
                Workplace
            </div>
            <div id="beneficiary">
                Beneficiary
            </div>
        </SFTabs>
        <button className="button is-primary" onClick={() => executeCommand()}>
            Guardar
        </button>
        </>
    );
}