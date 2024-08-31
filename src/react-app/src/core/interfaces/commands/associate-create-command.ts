import AssociateInfo from "../info/associate-info";

export default interface AssociateCreateCommand extends AssociateInfo {
  commandId?: string;
}