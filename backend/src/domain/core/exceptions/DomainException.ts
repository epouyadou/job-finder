import { DomainError } from '../primitives/DomainError';

export class DomainException extends Error {
  constructor(error: DomainError) {
    super(error.message);
    this.name = error.code;
  }
}
