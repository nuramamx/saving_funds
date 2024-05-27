export default interface CommandResponseInfo {
    readonly successful: boolean;
    readonly message: string;
    readonly data?: string;
    readonly type: 'success' | 'danger' | 'warning' | 'info';
    readonly errors: string[];
}