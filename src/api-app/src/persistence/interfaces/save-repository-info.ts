export default interface SaveRepositoryInfo<I,O> {
  save(data: I): Promise<O>;
}