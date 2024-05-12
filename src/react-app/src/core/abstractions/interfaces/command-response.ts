export default interface CommandResponse {
    readonly successful: boolean;
    readonly message: string;
    readonly code: number;
    readonly errors: string[];
}