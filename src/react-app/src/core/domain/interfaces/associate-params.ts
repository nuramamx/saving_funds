import Gender from "../enums/gender";
import NameInfo from "./name-info";

export default interface AssociateParams {
    readonly name: NameInfo;
    readonly rfc: string;
    readonly gender: Gender;
}