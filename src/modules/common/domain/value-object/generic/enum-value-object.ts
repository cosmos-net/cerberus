import ValidationDomainException from '@common/domain/exceptions/validation.exception';

import { ValueObject } from './value-object';

export abstract class EnumValueObject<T> extends ValueObject<T> {
  constructor(
    value: T,
    readonly validValues: T[],
  ) {
    super(value);
    this.checkValueIsValid(value);
  }

  private checkValueIsValid(value: T): void {
    if (!this.validValues.includes(value)) {
      throw new ValidationDomainException(
        `Value <${value}> is not valid for enum ${this.constructor.name}. Valid values are: ${this.validValues.join(', ')}`,
      );
    }
  }
}
