export class FmcsaApiError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FmcsaApiError';
    }
}