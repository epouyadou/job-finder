import { DomainError } from './DomainError';
import { Result } from './Result';

export class TypedResult<TValue> extends Result {
  constructor(
    value: TValue | undefined,
    isSuccess: boolean,
    error: DomainError,
  ) {
    super(isSuccess, error);
    this._value = value;
  }

  private readonly _value: TValue | undefined;

  get value(): TValue {
    if (!this.isSuccess()) {
      throw new Error('Cannot access value of a failed result');
    }
    if (!this._value) {
      throw new Error('Value is undefined');
    }
    return this._value;
  }

  static typedSuccess<TValue>(value: TValue): TypedResult<TValue> {
    return new TypedResult<TValue>(value, true, DomainError.None);
  }

  static typedFailure<TValue>(error: DomainError): TypedResult<TValue> {
    return new TypedResult<TValue>(undefined, false, error);
  }

  static create<TValue>(
    value?: TValue,
    error: DomainError = DomainError.None,
  ): Result {
    if (value === undefined || value === null) {
      return this.typedFailure(error);
    } else {
      return this.typedSuccess(value);
    }
  }
}
