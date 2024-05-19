import { Gender } from "../types/gender";
import NameInfo from "./name-info";

export default interface AssociateInfo {
    name: NameInfo;
    rfc: string;
    gender: Gender;
}