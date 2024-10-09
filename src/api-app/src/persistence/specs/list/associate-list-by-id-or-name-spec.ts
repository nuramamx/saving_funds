export default interface AssociateListByIdOrNameSpec {
  id: number;
  name: string;
  rfc: string;
  agreement_name: string;
  has_active_borrows: boolean;
}