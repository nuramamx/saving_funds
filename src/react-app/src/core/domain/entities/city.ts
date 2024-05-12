import State from "./state";

export default class City {
    constructor(
        readonly name: string,
        readonly state: State
    ) {
        this.name = name;
        this.state = state;
    }
}