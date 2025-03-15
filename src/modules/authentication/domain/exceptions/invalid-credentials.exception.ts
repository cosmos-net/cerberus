import { AuthenticationDomainException } from './authentication-domain.exception';

export class InvalidCredentialsException extends AuthenticationDomainException {
  constructor(message: string = 'Invalid credentials provided') {
    super(message);
    this.name = 'InvalidCredentialsException';
  }
}
