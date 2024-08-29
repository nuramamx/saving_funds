import { createContext } from "react";
import CreateAssociate from "./create-associate";

export const AssociatePageContext = createContext({});

export default function AssociatePage() {
  return (
    <CreateAssociate />
  );
}