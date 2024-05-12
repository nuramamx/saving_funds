import City from "../entities/city";

export default interface AddressParams {
    readonly street: string;
    readonly settlement: string;
    readonly town: string;
    readonly postal_code: string;
    readonly city: City;
    readonly phone: string;
    readonly mobile: string;
    readonly email: string;
}