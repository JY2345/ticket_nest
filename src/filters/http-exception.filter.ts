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

    let message = exception.message;

    const exceptionResponse = exception.getResponse();
    if (typeof exceptionResponse === 'object') {
      message = (exceptionResponse as any).message;
    }

    if (exception instanceof UnauthorizedException) {
      message = "로그인을 해주세요!";
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
