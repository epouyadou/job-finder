import { InvalidOperationException } from '../exceptions/InvalidOperationException';
import { DomainError } from './DomainError';

export class Result {
  constructor(
    private readonly _isSuccess: boolean,
    public readonly error: DomainError,
  ) {
    if (_isSuccess && error !== DomainError.None) {
      throw new InvalidOperationException();
    } else if (!_isSuccess && error === DomainError.None) {
      throw new InvalidOperationException();
    }

    this._isSuccess = _isSuccess;
    this.error = error;
  }

  isSuccess(): boolean {
    return this._isSuccess;
  }

  isFailure(): boolean {
    return !this._isSuccess;
  }

  static success(): Result {
    return new Result(true, DomainError.None);
  }

  static failure(error: DomainError): Result {
    return new Result(false, error);
  }

  static firstFailureOrSuccess(...results: Result[]): Result {
    for (const result of results) {
      if (result.isFailure()) {
        return result;
      }
    }
    return Result.success();
  }
}
