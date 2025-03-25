import { AuthenticationDomainException } from '@authentication/domain/exceptions/authentication-domain.exception';

export interface IPersonalInfo {
  email?: string;
  username?: string;
  [key: string]: string | string[] | undefined;
}

export interface IPasswordPolicyOptions {
  minLength?: number;
  requiresUppercase?: boolean;
  requiresLowercase?: boolean;
  requiresNumber?: boolean;
  requiresSpecial?: boolean;
  specialChars?: string;
  checkCommonPasswords?: boolean;
  checkPersonalInfo?: boolean;
}

interface IPasswordValidator {
  validate(password: string, context?: unknown): string | null;
  isEnabled(options: IPasswordPolicyOptions): boolean;
}

class MinLengthValidator implements IPasswordValidator {
  validate(password: string, options: IPasswordPolicyOptions): string | null {
    const minLength = options.minLength || 8;
    return password.length < minLength
      ? `La contraseña debe tener al menos ${minLength} caracteres`
      : null;
  }

  isEnabled(): boolean {
    return true;
  }
}

class UppercaseValidator implements IPasswordValidator {
  validate(password: string): string | null {
    return !/[A-Z]/.test(password) ? 'Debe incluir al menos una letra mayúscula' : null;
  }

  isEnabled(options: IPasswordPolicyOptions): boolean {
    return !!options.requiresUppercase;
  }
}

class LowercaseValidator implements IPasswordValidator {
  validate(password: string): string | null {
    return !/[a-z]/.test(password) ? 'Debe incluir al menos una letra minúscula' : null;
  }

  isEnabled(options: IPasswordPolicyOptions): boolean {
    return !!options.requiresLowercase;
  }
}

class NumberValidator implements IPasswordValidator {
  validate(password: string): string | null {
    return !/\d/.test(password) ? 'Debe incluir al menos un número' : null;
  }

  isEnabled(options: IPasswordPolicyOptions): boolean {
    return !!options.requiresNumber;
  }
}

class SpecialCharValidator implements IPasswordValidator {
  validate(password: string, options: IPasswordPolicyOptions): string | null {
    const specialChars = options.specialChars || '@$!%*?&#';
    return !new RegExp(`[${specialChars}]`).test(password)
      ? `Debe incluir al menos un carácter especial (${specialChars})`
      : null;
  }

  isEnabled(options: IPasswordPolicyOptions): boolean {
    return !!options.requiresSpecial;
  }
}

class ConfirmationValidator implements IPasswordValidator {
  validate(password: string, confirmation: string): string | null {
    return password !== confirmation ? 'La confirmación de contraseña no coincide' : null;
  }

  isEnabled(): boolean {
    return true;
  }
}

class CommonPasswordValidator implements IPasswordValidator {
  private static readonly COMMON_PASSWORDS = [
    'password',
    '123456',
    'qwerty',
    'abc123',
    'letmein',
    'welcome',
    'iloveyou',
    'admin',
    'user',
    'test',
    'guest',
    'root',
    'superuser',
    'administrator',
    'default',
    'letmein123',
    'password1',
    '12345678',
    '123456789',
    '12345',
    '1234567',
    '1234567890',
    '123456a',
    '123456b',
    '123456c',
  ];

  validate(password: string): string | null {
    const lowercasePassword = password.toLowerCase();

    for (const commonPassword of CommonPasswordValidator.COMMON_PASSWORDS) {
      if (lowercasePassword.includes(commonPassword)) {
        return `La contraseña no debe contener la secuencia "${commonPassword}"`;
      }
    }

    return null;
  }

  isEnabled(options: IPasswordPolicyOptions): boolean {
    return !!options.checkCommonPasswords;
  }
}

class PersonalInfoValidator implements IPasswordValidator {
  validate(password: string, personalInfo: IPersonalInfo): string | null {
    const lowercasePassword = password.toLowerCase();

    for (const key in personalInfo) {
      if (Object.prototype.hasOwnProperty.call(personalInfo, key)) {
        const value = personalInfo[key];

        if (typeof value === 'string' && value.length > 3) {
          const lowercaseValue = value.toLowerCase();
          if (lowercasePassword.includes(lowercaseValue)) {
            return `La contraseña no debe contener la información personal "${value}"`;
          }
        } else if (Array.isArray(value)) {
          for (const item of value) {
            if (item.length > 3 && lowercasePassword.includes(item.toLowerCase())) {
              return `La contraseña no debe contener la información personal "${item}"`;
            }
          }
        }
      }
    }

    return null;
  }

  isEnabled(options: IPasswordPolicyOptions): boolean {
    return !!options.checkPersonalInfo;
  }
}

export class ManagerPasswordPolicyService {
  private static readonly DEFAULT_OPTIONS: IPasswordPolicyOptions = {
    minLength: 8,
    requiresUppercase: true,
    requiresLowercase: true,
    requiresNumber: true,
    requiresSpecial: true,
    specialChars: '@$!%*?&#',
    checkCommonPasswords: true,
    checkPersonalInfo: true,
  };

  private readonly options: IPasswordPolicyOptions;
  private readonly validators: IPasswordValidator[];

  constructor() {
    this.options = ManagerPasswordPolicyService.DEFAULT_OPTIONS;

    this.validators = [
      new MinLengthValidator(),
      new UppercaseValidator(),
      new LowercaseValidator(),
      new NumberValidator(),
      new SpecialCharValidator(),
      new CommonPasswordValidator(),
      new PersonalInfoValidator(),
    ];
  }

  public validate(
    plainPassword: string,
    passwordConfirmation?: string,
    personalInfo?: IPersonalInfo,
  ): void {
    const validationErrors: string[] = [];

    this.validators.forEach((validator) => {
      if (validator.isEnabled(this.options)) {
        const error = validator.validate(plainPassword, this.options);
        if (error) validationErrors.push(error);
      }
    });

    if (passwordConfirmation !== undefined) {
      const confirmValidator = new ConfirmationValidator();
      const error = confirmValidator.validate(plainPassword, passwordConfirmation);
      if (error) validationErrors.push(error);
    }

    if (personalInfo && this.options.checkPersonalInfo) {
      const personalInfoValidator = new PersonalInfoValidator();
      const error = personalInfoValidator.validate(plainPassword, personalInfo);
      if (error) validationErrors.push(error);
    }

    if (validationErrors.length > 0) {
      throw new AuthenticationDomainException(validationErrors.join(', '));
    }
  }

  public static validate(
    plainPassword: string,
    passwordConfirmation?: string,
    personalInfo?: IPersonalInfo,
  ): void {
    const service = new ManagerPasswordPolicyService();
    service.validate(plainPassword, passwordConfirmation, personalInfo);
  }
}
