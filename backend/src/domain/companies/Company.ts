import { DomainException } from '@domain/core/exceptions/DomainException';
import { CompanyDomainError } from './CompanyDomainError';

export class Company {
  protected constructor(
    public readonly id: number | undefined,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(params: {
    id: number | undefined;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }): Company {
    if (!params.name || params.name.trim() === '') {
      throw new DomainException(CompanyDomainError.INVALID_COMPANY_NAME);
    }
    return new Company(
      params.id,
      params.name,
      params.createdAt,
      params.updatedAt,
    );
  }
}
