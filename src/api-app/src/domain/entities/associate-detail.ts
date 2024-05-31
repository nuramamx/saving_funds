import AssociateDetailInfo from "../interfaces/associate-detail-info";

export default class AssociateDetail implements AssociateDetailInfo {
    private picture: string = null!;

    constructor(
        readonly agreementId: number,
        readonly dependencyKey: string,
        readonly category: string,
        readonly salary: number,
        readonly socialContribution: number,
        readonly fortnightlyContribution: number,
        readonly requestDate: Date
    ) {}

    definePicture(picture: string): AssociateDetail {
        this.picture = picture;
        
        return this;
    }
}