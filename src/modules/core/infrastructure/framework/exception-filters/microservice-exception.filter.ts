import { Catch, ArgumentsHost, Logger, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

import DomainException from '@common/domain/exceptions/domain.exception';
import handleDomainException from '@common/infrastructure/exceptions/handle-domain-exception';

type ErrorType = {
  message?: string;
  name?: string;
  status?: number;
  stack?: string;
};

type ErrorResponseType = {
  stack?: string;
  error?: ErrorType | string;
};

@Catch(RpcException)
export class MicroserviceExceptionFilter implements RpcExceptionFilter<RpcException> {
  private readonly logger = new Logger(MicroserviceExceptionFilter.name);

  catch(exception: RpcException, _host: ArgumentsHost): Observable<ErrorResponseType> {
    const error = exception.getError();

    let bodyResponse: ErrorResponseType = {
      error,
    };

    if (error instanceof DomainException) {
      const domainException = handleDomainException(error);

      bodyResponse = {
        ...bodyResponse,
        error: {
          ...(typeof bodyResponse.error === 'object' ? bodyResponse.error : {}),
          message: domainException.message,
          status: domainException.statusCode,
        },
      };
    }

    if (typeof error === 'object') {
      const errorDetails =
        typeof bodyResponse.error === 'object'
          ? bodyResponse.error
          : { message: 'Internal Server Error', name: 'Error', status: 500, stack: '' };
      const message = errorDetails.message ?? 'Internal Server Error';
      const name = errorDetails.name ?? 'Error';
      const status = errorDetails.status ?? 500;
      const stack = (error as ErrorType).stack ?? '';

      bodyResponse = {
        ...bodyResponse,
        stack,
        error: {
          message,
          name,
          status,
        },
      };
    }

    this.logger.error(`Error: ${JSON.stringify(bodyResponse)}`);
    return throwError(() => bodyResponse);
  }
}
