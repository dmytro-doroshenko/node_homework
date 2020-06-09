module.exports = class ErrorsHandler extends Error {
    constructor(message, status, customErrorCode) {
        super(message);

        this.status = status;
        this.customErrorCode = customErrorCode;

        Error.captureStackTrace(this, this.constructor);
    }
}