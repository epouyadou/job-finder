import { DomainError } from '@domain/core/primitives/DomainError';

export class CompanyDomainError {
  static readonly COMPANY_NOT_FOUND = new DomainError(
    'CompanyNotFound',
    'The company was not found',
  );

  static readonly INVALID_COMPANY_NAME = new DomainError(
    'CompanyNameInvalid',
    'The company name is invalid',
  );

  static readonly COMPANY_ALREADY_EXISTS = new DomainError(
    'CompanyAlreadyExists',
    'The company already exists',
  );
}
