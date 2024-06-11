import ErrorCodes from "../../domain/types/error-codes";

export default interface CommandResponse {
    readonly successful: boolean;
    readonly code?: ErrorCodes;
    readonly message: string;
    readonly data?: string;
    readonly type: 'success' | 'danger' | 'warning' | 'info';
    readonly errors: string[];
}