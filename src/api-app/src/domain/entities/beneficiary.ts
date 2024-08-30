import BeneficiaryInfo from "../interfaces/beneficiary-info";

export default class Beneficiary implements BeneficiaryInfo {
  constructor(readonly name: string, readonly percentage: number) {}
}