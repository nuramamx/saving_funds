export default interface QueryRepositoryInfo<T> {
  all?(): Promise<T[]>;
  byIdOrName?(data: string): Promise<T>;
}