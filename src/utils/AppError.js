class AppError {

  message;
  statusCode;
  
  constructor(message, statusCode = 400) {
  
  this.message = message;
  this.statuscode = statusCode;
  
    }
  }
  
  module.exports = AppError;