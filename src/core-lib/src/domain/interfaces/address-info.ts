import City from "../entities/city";

export default interface AddressInfo {
    street: string;
    settlement: string;
    town: string;
    postal_code: string;
    city: City;
    phone: string;
    mobile: string;
    email: string;
}