import {
  BadRequestException,
  HttpException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export class ValidationPipeWithExceptionFactory extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors: ValidationError[]): HttpException => {
        const errorMapped = this.flattenValidationErrors(errors);
        return new BadRequestException(errorMapped);
      },
    });
  }

  protected customFlattenValidationErrors(
    errors: ValidationError[],
    parentPath = '',
  ): { field: string; constraints: { [type: string]: string } }[] {
    return errors.reduce(
      (acc: { field: string; constraints: { [type: string]: string } }[], error) => {
        const propertyPath = parentPath ? `${parentPath}.${error.property}` : error.property;

        if (error.constraints) {
          acc.push({
            field: propertyPath,
            constraints: error.constraints,
          });
        }

        if (error.children && error.children.length > 0) {
          acc.push(
            ...(this.customFlattenValidationErrors(error.children, propertyPath) as {
              field: string;
              constraints: { [type: string]: string };
            }[]),
          );
        }

        return acc;
      },
      [] as { field: string; constraints: { [type: string]: string } }[],
    );
  }
}
