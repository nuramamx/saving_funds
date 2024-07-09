export default interface QuerySearchRepositoryInfo<T> {
  byIdOrName(id: number, name: string): Promise<T[]>;
}