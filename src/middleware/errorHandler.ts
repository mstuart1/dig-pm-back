import type { Request, Response, NextFunction } from 'express';
// import logEvents from './logEvents.js'


export class AppError extends Error {
  statusCode = 400
  static typeToCode = {
    validation: 400,
    unauthorized: 401,
    forbidden: 403,
    server: 500
  }
  constructor(type: keyof typeof AppError.typeToCode, message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = Error.name
    this.statusCode = AppError.typeToCode[type]
    Error.captureStackTrace(this)
  }
}



const errorHandler = (
  error: any,
  _: Request,
  response: Response,
  _next: NextFunction // eslint-disable-line no-unused-vars
) => {
    // logEvents(`${error.name}: ${error.message}`, 'error.log');
  response
    .status(error.statusCode || 500)
    .json({
      message:
        error 
          ? error.message
          : 'Oops! Something wonky happened...'
    });
};



export default errorHandler