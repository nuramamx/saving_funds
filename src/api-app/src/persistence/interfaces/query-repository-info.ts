export default interface QueryRepositoryInfo<T> {
  all(): Promise<T[]>;
}