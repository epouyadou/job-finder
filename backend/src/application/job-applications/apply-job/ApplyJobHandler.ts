import {
  DATE_TIME_SYMBOL,
  IDateTime,
} from '@application/abstractions/common/IDateTime';
import { Company } from '@domain/companies/Company';
import {
  COMPANY_REPOSITORY_SYMBOL,
  ICompanyRepository,
} from '@domain/companies/ICompanyRepository';
import { ApplicationRejectCause } from '@domain/job-applications/ApplicationRejectCause';
import { ApplicationStatus } from '@domain/job-applications/ApplicationStatus';
import {
  IJobApplicationRepository,
  JOB_APPLICATION_REPOSITORY_SYMBOL,
} from '@domain/job-applications/IJobApplicationRepository';
import { JobApplication } from '@domain/job-applications/JobApplication';
import {
  IJobRepository,
  JOB_REPOSITORY_SYMBOL,
} from '@domain/jobs/IJobRepository';
import { Job } from '@domain/jobs/Job';
import { JobStatus } from '@domain/jobs/JobStatus';
import { JobType } from '@domain/jobs/JobType';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { parseSalary } from './../../../domain/jobs/JobSalary';
import { ApplyJobCommand } from './ApplyJobCommand';

@CommandHandler(ApplyJobCommand)
export class ApplyJobHandler implements ICommandHandler<ApplyJobCommand> {
  constructor(
    @Inject(JOB_APPLICATION_REPOSITORY_SYMBOL)
    private readonly jobApplicationRepository: IJobApplicationRepository,

    @Inject(JOB_REPOSITORY_SYMBOL)
    private readonly jobRepository: IJobRepository,

    @Inject(COMPANY_REPOSITORY_SYMBOL)
    private readonly companyRepository: ICompanyRepository,

    @Inject(DATE_TIME_SYMBOL)
    private readonly dateProvider: IDateTime,
  ) {}

  async execute(command: ApplyJobCommand): Promise<void> {
    const {
      companyName,
      jobTitle,
      jobDescription,
      jobType,
      jobStatus,
      jobUrl,
      jobLocation,
      jobSalary,
      jobPostedDate,
      jobApplicationStatus,
    } = command;

    // Find or create the company
    let existingCompany = await this.companyRepository.findOneById(companyName);
    if (!existingCompany) {
      const companyToPersist = Company.create({
        id: undefined, // No ID since we're creating a new company
        name: companyName,
        createdAt: this.dateProvider.utcNow(),
        updatedAt: this.dateProvider.utcNow(),
      });
      existingCompany = await this.companyRepository.save(companyToPersist);
    }

    const parsedSalary = parseSalary(jobSalary);

    // Create the job
    const jobToPersist = Job.create({
      id: undefined, // No ID since we're creating a new job
      companyId: existingCompany.id!,
      title: jobTitle,
      description: jobDescription,
      type: JobType.fromString(jobType),
      status: JobStatus.fromString(jobStatus),
      url: jobUrl,
      location: jobLocation || undefined,
      salary: parsedSalary,
      createdAt: jobPostedDate,
      updatedAt: this.dateProvider.utcNow(),
    });

    const job = await this.jobRepository.save(jobToPersist);

    // Create the job application
    const jobApplicationToPersist = JobApplication.create({
      id: undefined, // No ID since we're creating a new application
      jobId: job.id!,
      status: ApplicationStatus.fromString(jobApplicationStatus),
      rejectedCause: ApplicationRejectCause.NOT_YET_REJECTED,
      specifiedRejectedCause: undefined,
      appliedAt: this.dateProvider.utcNow(),
      updatedAt: this.dateProvider.utcNow(),
    });

    await this.jobApplicationRepository.save(jobApplicationToPersist);
  }
}
