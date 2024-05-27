import State from "./state";

export default class City {
    constructor(
        readonly id: number,
        readonly name: string,
        readonly stateId: number
    ) {}
}