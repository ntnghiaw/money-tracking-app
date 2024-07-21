'use strict'

const StatusCode = require('../utils/httpStatusCode').StatusCodes
const ReasonStatusCode = require('../utils/httpStatusCode').ReasonPhrases

class ErrorResponse extends Error {

    constructor(message, status) {
        super(message)
        this.status = status
    }
}

class ConflictRequestError extends ErrorResponse {
    
    constructor(message = ReasonStatusCode.CONFLICT, statusCode = StatusCode.CONFLICT) {
        super(message, statusCode)
    }
}

class BadRequestError extends ErrorResponse {
    
    constructor(message = ReasonStatusCode.FORBIDDEN, statusCode = StatusCode.FORBIDDEN) {
        super(message, statusCode)
    }
}

class InternalServerError extends ErrorResponse {
    
    constructor(message = ReasonStatusCode.INTERNAL, statusCode = StatusCode.INTERNAL) {
        super(message, statusCode)
    }
}

class AuthFailureError extends ErrorResponse {
    
    constructor(message = ReasonStatusCode.UNAUTHORIZED, statusCode = StatusCode.UNAUTHORIZED) {
        super(message, statusCode)
    }
}

class NotFoundError extends ErrorResponse {
    
    constructor(message = ReasonStatusCode.NOT_FOUND, statusCode = StatusCode.NOT_FOUND) {
        super(message, statusCode)
    }
}



module.exports = {
    ConflictRequestError,
    BadRequestError,
    InternalServerError,
    AuthFailureError,
    NotFoundError
}