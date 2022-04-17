import { ExceptionFilter, Catch, ArgumentsHost, HttpException, InternalServerErrorException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  getMessageException(res: any): string {
    if(typeof res === "string") return res;
    
    const message = res["message"];

    if(!message) return "Internal server error";
    if(Array.isArray(message)) return message.join(', ');

    return message;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseException = exception.getResponse();
    const message = this.getMessageException(responseException)

    response
      .status(status)
      .json({
        timestamp: new Date().toISOString(),
        path: request.url,
        message
      });
  }
}