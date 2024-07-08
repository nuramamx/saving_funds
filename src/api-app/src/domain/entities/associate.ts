import Address from './address';
import Beneficiary from './beneficiary';
import AssociateDetail from './associate-detail';
import Workplace from './workplace';
import NameInfo from '../interfaces/name-info';
import AssociateInfo from '../interfaces/associate-info';

export default class Associate implements AssociateInfo {
  private detail: AssociateDetail = undefined!;
  private address: Address = undefined!;
  private workplace: Workplace = undefined!;
  private beneficiaries: Beneficiary[] = [];

  constructor(
    readonly name: NameInfo,
    readonly rfc: string,
    readonly gender: string
  ) {}

  updateDetail(detail: AssociateDetail): Associate {
    this.detail = detail;

    return this;
  }

  getDetail(): AssociateDetail {
    return this.detail;
  }

  updateAddress(address: Address): Associate {
    this.address = address;

    return this;
  }

  getAddress(): Address {
    return this.address;
  }

  updateWorkplace(workplace: Workplace): Associate {
    this.workplace = workplace;

    return this;
  }

  getWorkplace(): Workplace {
    return this.workplace;
  }

  addBeneficiaries(beneficiaries: Beneficiary[]): Associate {
    const totalPercentage = beneficiaries
      .map(item => parseInt(item.percentage.toString()))
      .reduce((sum, percentage) => sum + percentage, 0);

    if (totalPercentage > 100)
      throw new Error('DOMAIN: El porcentaje total es superior al 100%');

    this.beneficiaries = [] = beneficiaries.filter((x) => x.percentage > 0);

    return this;
  }

  getBeneficiaries(): Beneficiary[] {
    return this.beneficiaries;
  }
}