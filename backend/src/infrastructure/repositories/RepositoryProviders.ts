import { COMPANY_REPOSITORY_SYMBOL } from '@domain/companies/ICompanyRepository';
import { JOB_APPLICATION_REPOSITORY_SYMBOL } from '@domain/job-applications/IJobApplicationRepository';
import { JOB_REPOSITORY_SYMBOL } from '@domain/jobs/IJobRepository';
import { CompanyRepository } from './CompanyRepository';
import { JobApplicationRepository } from './JobApplicationRepository';
import { JobRepository } from './JobRepository';

const CompanyRepositoryProvider = {
  provide: COMPANY_REPOSITORY_SYMBOL,
  useClass: CompanyRepository,
};

const JobRepositoryProvider = {
  provide: JOB_REPOSITORY_SYMBOL,
  useClass: JobRepository,
};

const JobApplicationRepositoryProvider = {
  provide: JOB_APPLICATION_REPOSITORY_SYMBOL,
  useClass: JobApplicationRepository,
};

export const RepositoryProviders = [
  CompanyRepositoryProvider,
  JobRepositoryProvider,
  JobApplicationRepositoryProvider,
];
