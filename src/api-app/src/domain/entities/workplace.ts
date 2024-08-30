import WorkplaceInfo from "../interfaces/workplace-info";

export default class Workplace implements WorkplaceInfo {
  constructor(
    readonly key: string,
    readonly name: string,
    readonly phone: string
  ) {}
}