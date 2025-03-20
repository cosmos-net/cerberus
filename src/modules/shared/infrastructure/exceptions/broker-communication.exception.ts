import { InternalServerErrorException } from '@nestjs/common';

export class HadesCommunicationException extends InternalServerErrorException {
  constructor(
    public readonly message: string,
    public readonly originalError?: Error,
  ) {
    super(message, originalError?.message);
  }
}
