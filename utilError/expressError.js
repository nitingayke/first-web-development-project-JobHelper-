class ExpressError extends Error{
    constructor(errorCode, message){
        super();
        this.errorCode = errorCode;
        this.message = message;
    }
}

module.exports = ExpressError;