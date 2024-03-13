import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message = exception.message;

    if (typeof exceptionResponse === 'object') {
      message = (exceptionResponse as any).message;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
