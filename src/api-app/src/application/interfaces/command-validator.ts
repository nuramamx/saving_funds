import CommandValidation from "./command-validation";

export default interface CommandValidator<T> {
    validate(command: T): CommandValidation[];
}