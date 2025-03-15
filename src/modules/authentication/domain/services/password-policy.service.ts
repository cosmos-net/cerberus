import { AuthenticationDomainException } from '@authentication/domain/exceptions/authentication-domain.exception';

export class PasswordPolicyService {
  private static readonly MIN_LENGTH = 8;
  private static readonly REQUIRES_UPPERCASE = true;
  private static readonly REQUIRES_LOWERCASE = true;
  private static readonly REQUIRES_NUMBER = true;
  private static readonly REQUIRES_SPECIAL = true;
  private static readonly SPECIAL_CHARS = '@$!%*?&#';

  public static validate(password: string): void {
    if (password.length < this.MIN_LENGTH) {
      throw new AuthenticationDomainException(
        `Password must be at least ${this.MIN_LENGTH} characters long`,
      );
    }

    if (this.REQUIRES_UPPERCASE && !/[A-Z]/.test(password)) {
      throw new AuthenticationDomainException(
        'Password must contain at least one uppercase letter',
      );
    }

    if (this.REQUIRES_LOWERCASE && !/[a-z]/.test(password)) {
      throw new AuthenticationDomainException(
        'Password must contain at least one lowercase letter',
      );
    }

    if (this.REQUIRES_NUMBER && !/\d/.test(password)) {
      throw new AuthenticationDomainException('Password must contain at least one number');
    }

    if (this.REQUIRES_SPECIAL && !new RegExp(`[${this.SPECIAL_CHARS}]`).test(password)) {
      throw new AuthenticationDomainException(
        `Password must contain at least one special character (${this.SPECIAL_CHARS})`,
      );
    }
  }

  public static generatePasswordRequirementsMessage(): string {
    let message = `Password must be at least ${this.MIN_LENGTH} characters long`;

    if (this.REQUIRES_UPPERCASE) {
      message += ', include at least one uppercase letter';
    }

    if (this.REQUIRES_LOWERCASE) {
      message += ', include at least one lowercase letter';
    }

    if (this.REQUIRES_NUMBER) {
      message += ', include at least one number';
    }

    if (this.REQUIRES_SPECIAL) {
      message += `, include at least one special character (${this.SPECIAL_CHARS})`;
    }

    return message;
  }
}
