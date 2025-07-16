import { Job } from '@domain/jobs/Job';
import { JobStatus } from '@domain/jobs/JobStatus';
import { JobType } from '@domain/jobs/JobType';
import { SalaryMapper } from './Salary.mapper';

export interface PersistedJob {
  id: number;
  company_id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  url: string;
  location: string;
  salary_amount: number;
  salary_min_amount: number;
  salary_max_amount: number;
  salary_currency: string;
  created_at: Date;
  updated_at: Date;
}

export class JobMapper {
  static toDomain(persistedJob: PersistedJob): Job {
    const salary = SalaryMapper.toDomain({
      salary_amount: persistedJob.salary_amount,
      salary_min_amount: persistedJob.salary_min_amount,
      salary_max_amount: persistedJob.salary_max_amount,
      salary_currency: persistedJob.salary_currency,
    });

    const jobType = JobType.fromString(persistedJob.type);
    const jobStatus = JobStatus.fromString(persistedJob.status);

    return Job.create({
      id: persistedJob.id,
      companyId: persistedJob.company_id,
      title: persistedJob.title,
      description: persistedJob.description,
      type: jobType,
      status: jobStatus,
      url: persistedJob.url,
      location: persistedJob.location || undefined,
      salary: salary,
      createdAt: new Date(persistedJob.created_at),
      updatedAt: new Date(persistedJob.updated_at),
    });
  }

  static AllToDomain(persistedJobs: PersistedJob[]): Job[] {
    return persistedJobs.map((persistedJob) =>
      JobMapper.toDomain(persistedJob),
    );
  }
}
