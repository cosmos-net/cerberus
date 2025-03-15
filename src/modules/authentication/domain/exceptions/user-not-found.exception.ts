import { AuthenticationDomainException } from './authentication-domain.exception';

export class UserNotFoundException extends AuthenticationDomainException {
  constructor(identifier: string) {
    super(`User with identifier: ${identifier} was not found`);
    this.name = 'UserNotFoundException';
  }
}
