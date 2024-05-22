import AddressInfo from "../interfaces/address-info";
import City from "./city";

export default class Address {
    readonly city_id
    readonly street: string;
    readonly settlement: string;
    readonly town: string;
    readonly postal_code: string;
    readonly phone: string;
    readonly mobile: string;
    readonly email: string;

    private city: City = undefined!;

    constructor(params: AddressInfo) {
        this.city_id = params.city_id;
        this.street = params.street;
        this.settlement = params.settlement;
        this.town = params.town;
        this.postal_code = params.postal_code;
        this.phone = params.phone;
        this.mobile = params.mobile;
        this.email = params.email;
    }

    getCity() {
        return this.city;
    }
}