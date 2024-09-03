import BatchInfo from "../interfaces/batch-info";

export default class Batch implements BatchInfo {
  constructor(
    readonly name: string,
    readonly batchFunction: string,
    readonly details: string
  ) {}
}