import { Job } from './Job';

export const JOB_REPOSITORY_SYMBOL = Symbol('IJobRepository');

export interface IJobRepository {
  findOneById(id: number): Promise<Job | null>;
  findAllByCompanyId(companyId: number): Promise<Job[]>;
  findAllByStatus(status: string): Promise<Job[]>;
  findAll(): Promise<Job[]>;

  save(job: Job): Promise<Job>;
  update(job: Job): Promise<Job>;
  delete(job: Job): Promise<void>;
}
