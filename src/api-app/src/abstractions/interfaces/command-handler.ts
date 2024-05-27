export default interface CommandHandler<T, CommandResponse> {
  execute(data?: T): Promise<CommandResponse>;
}