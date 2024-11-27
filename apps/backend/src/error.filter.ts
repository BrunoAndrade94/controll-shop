import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(Error)
export default class ErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();

    const status = (exception as any).getStatus
      ? (exception as any).getStatus()
      : 500;

    console.error(exception);

    response.status(status).json({
      statusCode: status,
      dateStamp: new Date().toLocaleDateString(),
      timeStamp: new Date().toLocaleTimeString(),
      path: request.url,
      message: exception.message,
    });
  }
}
