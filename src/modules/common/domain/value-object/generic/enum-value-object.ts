import ValidationDomainException from '@common/domain/exceptions/validation.exception';
import {
  ValueObject,
  ValueObjectPrimitiveType,
} from '@common/domain/value-object/generic/value-object';

export abstract class EnumValueObject<
  VALUE extends ValueObjectPrimitiveType,
  ENUM extends Record<string, VALUE>,
> extends ValueObject<VALUE> {
  constructor(
    value: VALUE,
    private readonly enumValues: ENUM,
  ) {
    super(value);
    this.ensureValueIsValid(value);
  }

  private ensureValueIsValid(value: VALUE): void {
    const isValidValue = Object.values(this.enumValues).includes(value);

    if (!isValidValue) {
      throw new ValidationDomainException(
        `Invalid value "${value.toString()}" for enum "${this.constructor.name}"`,
      );
    }
  }
}
