import { ValueObject } from '@common/domain/value-object/generic/value-object';

export abstract class NumberValueObject extends ValueObject<number> {
  isBiggerThan(other: NumberValueObject): boolean {
    return this._value > other._value;
  }
}
