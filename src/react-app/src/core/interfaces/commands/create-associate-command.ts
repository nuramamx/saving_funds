import AssociateInfo from "../associate-info";

export default interface CreateAssociateCommand extends AssociateInfo {
  commandId?: string;
}