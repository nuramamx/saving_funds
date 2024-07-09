export default interface QueryProcedureRepositoryInfo<T> {
  all(): Promise<T>;
}