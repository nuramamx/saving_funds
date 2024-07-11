export default interface QueryRepositoryInfo<I,T> {
  all(data?: I): Promise<T[]>;
}