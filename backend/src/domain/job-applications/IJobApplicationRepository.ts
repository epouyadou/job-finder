import { JobApplication } from './JobApplication';

export const JOB_APPLICATION_REPOSITORY_SYMBOL = Symbol(
  'IJobApplicationRepository',
);

export interface IJobApplicationRepository {
  findOneById(id: number): Promise<JobApplication | null>;
  findAllByJobId(jobId: number): Promise<JobApplication[]>;
  findAllByStatus(status: string): Promise<JobApplication[]>;
  findAll(): Promise<JobApplication[]>;

  save(jobApplication: JobApplication): Promise<JobApplication>;
  update(jobApplication: JobApplication): Promise<JobApplication>;
  delete(jobApplication: JobApplication): Promise<void>;
}
