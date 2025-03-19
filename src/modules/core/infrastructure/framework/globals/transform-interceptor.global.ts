import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type ResponseType<T> = {
  statusCode: number;
  errors: object;
  data: T;
  timestamp: string;
  path: string;
};

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    return next.handle().pipe(
      map((data: T): ResponseType<T> => {
        const response = context.switchToHttp().getResponse<Response>();
        const request = context.switchToHttp().getRequest<Request>();

        if (data === undefined) {
          response.status(204).send();
          return undefined as unknown as ResponseType<T>;
        }

        if (data === null) {
          response.status(404);
          return undefined as unknown as ResponseType<T>;
        }

        return {
          statusCode: response.statusCode || 200,
          errors: {},
          data,
          timestamp: new Date().toISOString(),
          path: request.url,
        } as ResponseType<T>;
      }),
    );
  }
}
