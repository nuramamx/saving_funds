import AssociateDetailInfo from "../interfaces/associate-detail-info";

export default class AssociateDetail implements AssociateDetailInfo {
  readonly agreementId: number;
  readonly dependencyKey: string;
  readonly category: string;
  readonly salary: number;
  readonly socialContribution: number;
  readonly fortnightlyContribution: number;
  readonly requestDate: Date;

  constructor(
    params: AssociateDetailInfo
  ) {
    this.agreementId = params.agreementId;
    this.dependencyKey = params.dependencyKey;
    this.category = params.category;
    this.salary = params.salary;
    this.socialContribution = params.socialContribution;
    this.fortnightlyContribution = params.fortnightlyContribution;
    this.requestDate = params.requestDate;
  }
}