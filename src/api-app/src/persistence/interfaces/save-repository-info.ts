import Associate from "../../domain/entities/associate";

export default interface SaveRepositoryInfo<T> {
  save(data: Associate): Promise<T>;
}