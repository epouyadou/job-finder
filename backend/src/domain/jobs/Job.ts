import { Ensure } from '@domain/core/guards/Ensure';
import { JobSalary } from './JobSalary';
import { JobStatus } from './JobStatus';
import { JobType } from './JobType';

export class Job {
  protected constructor(
    public readonly id: number | undefined,
    public readonly companyId: number,
    public readonly title: string,
    public readonly description: string,
    public readonly type: JobType,
    public readonly status: JobStatus,
    public readonly url: string,
    public readonly location: string | undefined,
    public readonly salary: JobSalary,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(params: {
    id: number | undefined;
    companyId: number;
    title: string;
    description: string;
    type: JobType;
    status: JobStatus;
    url: string;
    location: string | undefined;
    salary: JobSalary;
    createdAt: Date;
    updatedAt: Date;
  }): Job {
    Ensure.notNullOrUndefined(
      params.companyId,
      'Company ID must not be null or undefined',
      'companyId',
    );

    Ensure.notNullOrUndefined(
      params.title,
      'Title must not be null or undefined',
      'title',
    );

    Ensure.notNullOrUndefined(
      params.description,
      'Description must not be null or undefined',
      'description',
    );

    Ensure.notNullOrUndefined(
      params.type,
      'Job type must not be null or undefined',
      'type',
    );
    Ensure.notNullOrUndefined(
      params.status,
      'Job status must not be null or undefined',
      'status',
    );

    Ensure.notNullOrUndefined(
      params.url,
      'URL must not be null or undefined',
      'url',
    );

    return new Job(
      params.id,
      params.companyId,
      params.title,
      params.description,
      params.type,
      params.status,
      params.url,
      params.location,
      params.salary,
      params.createdAt,
      params.updatedAt,
    );
  }
}
