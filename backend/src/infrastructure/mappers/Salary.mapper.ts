import {
  JobSalary,
  RangeSalary,
  Salary,
  UndefinedSalary,
} from '@domain/jobs/JobSalary';

export type PersistedSalary = {
  salary_amount: number;
  salary_min_amount: number;
  salary_max_amount: number;
  salary_currency: string;
};

export class SalaryMapper {
  static toDomain(persistedSalary: PersistedSalary): JobSalary {
    if (
      persistedSalary.salary_max_amount &&
      persistedSalary.salary_max_amount &&
      persistedSalary.salary_currency
    ) {
      return new RangeSalary(
        persistedSalary.salary_min_amount,
        persistedSalary.salary_max_amount,
        persistedSalary.salary_currency,
      );
    } else if (
      persistedSalary.salary_amount &&
      persistedSalary.salary_currency
    ) {
      return new Salary(
        persistedSalary.salary_amount,
        persistedSalary.salary_currency,
      );
    }
    return new UndefinedSalary();
  }
}
