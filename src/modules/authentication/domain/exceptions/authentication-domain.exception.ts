import InvalidOperationDomainException from '@common/domain/exceptions/domain.exception';

export class AuthenticationDomainException extends InvalidOperationDomainException {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationDomainException';
  }
}
