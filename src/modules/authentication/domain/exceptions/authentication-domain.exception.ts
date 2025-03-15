import DomainException from '@common/domain/exceptions/domain.exception';

export class AuthenticationDomainException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationDomainException';
  }
}
