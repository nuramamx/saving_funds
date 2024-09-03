import BatchSpec from "../specs/batch-spec";

export default interface BatchComposerCommand extends BatchSpec {
  details: string;
}