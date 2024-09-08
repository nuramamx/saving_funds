import BatchDetailSpec from "../specs/batch-detail-spec";
import BatchSpec from "../specs/batch-spec";

export default interface BatchComposerCommand extends BatchSpec {
  details: BatchDetailSpec[];
}