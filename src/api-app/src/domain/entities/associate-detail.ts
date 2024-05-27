import AssociateDetailInfo from "../interfaces/associate-detail-info";

export default class AssociateDetail implements AssociateDetailInfo {
    private picture: string = null!;

    constructor(
        readonly dependency_key: string,
        readonly agreement: string,
        readonly category: string,
        readonly salary: number,
        readonly social_contribution: number,
        readonly fortnightly_contribution: number,
        readonly request_date: Date
    ) {}

    definePicture(picture: string): AssociateDetail {
        this.picture = picture;
        
        return this;
    }
}