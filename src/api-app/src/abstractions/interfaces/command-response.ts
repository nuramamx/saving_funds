export default interface CommandResponse {
    readonly successful: boolean;
    readonly message: string;
    readonly data?: string;
    readonly type: 'success' | 'danger' | 'warning' | 'info';
    readonly errors: string[];
}