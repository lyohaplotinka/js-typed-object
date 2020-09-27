export class TypeValidationError extends Error {
    constructor(message) {
        const newMessage = `[TypeValidationError] ${message}`
        super(newMessage);
    }
}