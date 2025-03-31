import BusinessConflictDomainException from '@common/domain/exceptions/business-conflict.exception';

export type ValueObjectPrimitiveType = string | number | boolean | Date;

export abstract class ValueObject<T extends ValueObjectPrimitiveType> {
  protected readonly _value: T;

  constructor(value: T) {
    this._value = value;
    this.ensureValueIsDefined(value);
  }

  get value(): T {
    return this._value;
  }

  private ensureValueIsDefined(value: T): void {
    const isInvalidValue = value === null || value === undefined;

    if (isInvalidValue) {
      throw new BusinessConflictDomainException('Value must be defined');
    }
  }

  public equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other._value === this._value;
  }

  public toString(): string {
    return typeof this._value === 'object' ? JSON.stringify(this._value) : this._value.toString();
  }
}
