export default interface CommandHandler<T, Buffer> {
  execute(data?: T): Promise<Buffer>;
}