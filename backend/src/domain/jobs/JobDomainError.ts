import { DomainError } from '@domain/core/primitives/DomainError';

export class JobDomainError {
  static readonly INVALID_JOB_SALARY = new DomainError(
    'InvalidJobSalary',
    'The job salary is invalid',
  );
}
