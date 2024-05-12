import { createContext } from "react";
import CommandHandlerMediator from "../../core/application/mediators/command-handler-mediator";
import CreateAssociate from "./create-associate";

export const AssociatePageContext = createContext({});

export default function AssociatePage() {
    return (
        <AssociatePageContext.Provider value={new CommandHandlerMediator()}>
            <CreateAssociate />
        </AssociatePageContext.Provider>
    );
}