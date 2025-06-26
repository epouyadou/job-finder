import { DomainException } from '@domain/core/exceptions/DomainException';
import { JobDomainError } from './JobDomainError';

export type JobSalary = UndefinedSalary | Salary | RangeSalary;

export class UndefinedSalary {
  constructor() {}
}

export class Salary {
  constructor(
    public readonly amount: number,
    public readonly currency: string,
  ) {
    if (amount < 0) {
      throw new DomainException(JobDomainError.INVALID_JOB_SALARY);
    }
  }

  toString(): string {
    return `${formatSalaryAmount(this.amount)} ${this.currency}`;
  }

  equals(other: JobSalary): boolean {
    if (!(other instanceof Salary)) {
      return false;
    }

    return this.amount === other.amount && this.currency === other.currency;
  }
}

export class RangeSalary {
  constructor(
    public readonly min: number,
    public readonly max: number,
    public readonly currency: string,
  ) {
    if (min < 0 || max < 0 || min > max) {
      throw new DomainException(JobDomainError.INVALID_JOB_SALARY);
    }
  }

  toString(): string {
    return `${formatSalaryAmount(this.min)} - ${formatSalaryAmount(this.max)} ${this.currency}`;
  }

  equals(other: JobSalary): boolean {
    if (!(other instanceof RangeSalary)) {
      return false;
    }

    return (
      this.min === other.min &&
      this.max === other.max &&
      this.currency === other.currency
    );
  }
}

function formatSalaryAmount(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(0)} M`;
  }
  if (amount % 1000 === 0) {
    return `${(amount / 1000).toFixed(0)} K`;
  }
  return `${amount}`;
}

export function parseSalary(jobSalary?: string): JobSalary {
  if (!jobSalary) {
    return new UndefinedSalary();
  }

  const jobSalaryTrimmed = jobSalary.trim();

  const salaryRegex = /^(\d+)(?:(?:\s+)?-(?:\s+)?(\d+))?(?:\s+)?([^\d\s]+)$/;
  const match = jobSalaryTrimmed.match(salaryRegex);

  if (match) {
    const hasMaxSalary = match[2] !== undefined;
    if (hasMaxSalary) {
      const minSalary = parseInt(match[1], 10);
      const maxSalary = parseInt(match[2], 10);
      const currency = match[3]?.trim() || 'USD';
      return new RangeSalary(minSalary, maxSalary, currency);
    } else {
      const amount = parseInt(match[1], 10);
      const currency = match[3]?.trim() || 'USD';
      return new Salary(amount, currency);
    }
  }

  return new UndefinedSalary();
}
