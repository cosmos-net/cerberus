import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';

type ErrorType = {
  message?: string;
  name?: string;
  status?: number;
};

type ErrorResponseType = {
  stack?: string;
  error?: ErrorType | string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): Observable<never> {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as Record<string, string>;

    const { message, error } = exceptionResponse;

    this.logger.error(
      `Http Status: ${status} Error: ${JSON.stringify(exceptionResponse)}} Path: ${request.url} stack ${
        exception.stack
      }`,
    );

    const bodyResponse: ErrorResponseType = {
      stack: exception.stack,
      error: {
        message,
        name: error,
        status,
      },
    };

    return throwError((): ErrorResponseType => bodyResponse);
  }
}
