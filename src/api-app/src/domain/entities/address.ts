import AddressInfo from "../interfaces/address-info";
import City from "./city";

export default class Address implements AddressInfo {
  readonly cityId
  readonly street: string;
  readonly settlement: string;
  readonly town: string;
  readonly postalCode: string;
  readonly phone: string;
  readonly mobile: string;
  readonly email: string;

  private city: City = undefined!;

  constructor(params: AddressInfo) {
    this.cityId = params.cityId;
    this.street = params.street;
    this.settlement = params.settlement;
    this.town = params.town;
    this.postalCode = params.postalCode;
    this.phone = params.phone;
    this.mobile = params.mobile;
    this.email = params.email;
  }

  getCity() {
    return this.city;
  }
}