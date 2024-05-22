import Address from "./address";
import Beneficiary from "./beneficiary";
import AssociateDetail from "./associate-detail";
import Workplace from "./workplace";
import NameInfo from "../interfaces/name-info";
import DomainException from "../exceptions/domain-exception";

export default class Associate {
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

    updateAddress(address: Address): Associate {
        this.address = address;

        return this;
    }

    updateWorkplace(workplace: Workplace): Associate {
        this.workplace = this.workplace;

        return this;
    }

    addBeneficiary(beneficiary: Beneficiary): void {
        this.beneficiaries.push(beneficiary);
    }

    addBeneficiaries(beneficiaries: Beneficiary[]): void {
        const totalPercentage = beneficiaries
            .map(item => item.percentage)
            .reduce((sum, percentage) => sum + percentage, 0);

        if (totalPercentage > 100)
            throw new Error("El porcentaje total es superior al 100%");

        this.beneficiaries.push(...beneficiaries);
    }
}