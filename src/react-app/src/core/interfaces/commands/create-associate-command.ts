import AssociateInfo from "../info/associate-info";

export default interface CreateAssociateCommand extends AssociateInfo {
  commandId?: string;
}