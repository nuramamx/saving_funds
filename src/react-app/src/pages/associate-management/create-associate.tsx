import { useContext, useState } from "react";
import AssociateDetail from "../../core/domain/entities/associate-detail";
import Address from "../../core/domain/entities/address";
import Gender from "../../core/domain/enums/gender";
import CommandHandlerMediator from "../../core/application/mediators/command-handler-mediator";
import { AssociatePageContext } from "./associate-page";
import CommandResponse from "../../core/abstractions/interfaces/command-response";

export default function CreateAssociate() {
    const command = useContext(AssociatePageContext) as CommandHandlerMediator;
    const [commandResult, setCommandResult] = useState<CommandResponse>({ successful: false } as CommandResponse);

    const executeCommand = () => {
        const detail = new AssociateDetail("", "", "", 1000, 1000, 1000, new Date());
        const address = new Address({ street: "", settlement: "", town: "", postal_code: "", city: { name: "", state: { name: "" }}, phone: "", mobile: "", email: ""});

        const result: CommandResponse = command.execute("CreateAssociateCommand", {
            name: { firstname: "hola", middlename: "", paternal_lastname: "hola", maternal_lastname: "" },
            rfc: "",
            gender: Gender.MALE,
            detail: detail,
            address: address,
            beneficiaries: []
        });

        setCommandResult(result);
    };

    return (
        <div>
            <button onClick={executeCommand}>Click Me!</button><br /><br />
            <label>Result: {commandResult.message}</label>
        </div>
    );
}