import { createContext } from "react";
import CreateAssociate from "./create-associate";
import CommandHandlerMediator from "../../../core/application/mediators/command-handler-mediator";

export const AssociatePageContext = createContext({});

export default function AssociatePage() {
    return (
        <AssociatePageContext.Provider value={new CommandHandlerMediator()}>
            <CreateAssociate />
        </AssociatePageContext.Provider>
    );
}