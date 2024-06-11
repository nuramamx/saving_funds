export default interface QueryRepositoryInfo<T> {
  all?(): Promise<T[]>;
  byName?<E>(data: string): Promise<E>;
}