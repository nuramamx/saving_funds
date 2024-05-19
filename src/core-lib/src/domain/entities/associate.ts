import Address from "./address";
import Beneficiary from "./beneficiary";
import AssociateDetail from "./associate-detail";
import Workplace from "./workplace";
import AssociateInfo from "../interfaces/associate-info";
import NameInfo from "../interfaces/name-info";
import { Gender } from "../types/gender";

export default class Associate {
    private detail: AssociateDetail = null!;
    private address: Address = null!;
    private workplace: Workplace = null!;
    private beneficiaries: Beneficiary[] = [];

    constructor(
        readonly name: NameInfo,
        readonly rfc: string,
        readonly gender: Gender
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
        this.beneficiaries.push(...beneficiaries);
    }
}