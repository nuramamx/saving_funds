export default interface DeleteRepositoryInfo<I, O> {
  delete(data: I): Promise<boolean>;
}