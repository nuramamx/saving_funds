import AddressInfo from "../interfaces/address-info";
import City from "./city";

export default class Address {
    readonly street: string;
    readonly settlement: string;
    readonly town: string;
    readonly postal_code: string;
    readonly city: City;
    readonly phone: string;
    readonly mobile: string;
    readonly email: string;

    constructor(params: AddressInfo) {
        this.street = params.street;
        this.settlement = params.settlement;
        this.town = params.town;
        this.postal_code = params.postal_code;
        this.city = params.city;
        this.phone = params.phone;
        this.mobile = params.mobile;
        this.email = params.email;
    }
}