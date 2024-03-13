import { ExceptionFilter, Catch, ArgumentsHost, HttpException, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    if (exception instanceof UnauthorizedException) {
      response
        .status(status)
        .json({
          statusCode: status,
          message: "로그인을 해주세요!",
        });
    } else {
      response
        .status(status)
        .json({
          statusCode: status,
          message: exception.message || '서버 에러가 발생했습니다.',
        });
    }
  }
}
