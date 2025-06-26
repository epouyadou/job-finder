export class DomainError {
  constructor(
    public readonly code: string,
    public readonly message: string,
  ) {}

  toString(): string {
    return `DomainError [${this.code}]: ${this.message}`;
  }

  equals(other: DomainError): boolean {
    if (this.code === other.code) {
      return true;
    }
    return false;
  }

  static fromError(error: Error): DomainError {
    return new DomainError('Unknown', error.message);
  }

  static readonly None = new DomainError('None', 'No error occurred');
}
