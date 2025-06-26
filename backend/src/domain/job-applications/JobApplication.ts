import { Ensure } from '@domain/core/guards/Ensure';
import { ApplicationRejectCause } from './ApplicationRejectCause';
import { ApplicationStatus } from './ApplicationStatus';

export class JobApplication {
  id?: number;
  jobId: number;
  status: ApplicationStatus;
  rejectedCause: ApplicationRejectCause;
  specifiedRejectedCause: string | undefined;
  appliedAt: Date;
  updatedAt: Date;

  protected constructor(
    id: number | undefined,
    jobId: number,
    status: ApplicationStatus,
    rejectedCause: ApplicationRejectCause,
    specifiedRejectedCause: string | undefined,
    appliedAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.jobId = jobId;
    this.status = status;
    this.rejectedCause = rejectedCause;
    this.specifiedRejectedCause = specifiedRejectedCause;
    this.appliedAt = appliedAt;
    this.updatedAt = updatedAt;
  }

  static create(params: {
    id: number | undefined;
    jobId: number;
    status: ApplicationStatus;
    rejectedCause: ApplicationRejectCause;
    specifiedRejectedCause: string | undefined;
    appliedAt: Date;
    updatedAt: Date;
  }): JobApplication {
    Ensure.notNullOrUndefined(
      params.jobId,
      'Job ID must not be null or undefined',
      'jobId',
    );

    Ensure.notNullOrUndefined(
      params.status,
      'Application status must not be null or undefined',
      'status',
    );

    Ensure.notNullOrUndefined(
      params.rejectedCause,
      'Application rejected cause must not be null or undefined',
      'rejectedCause',
    );

    return new JobApplication(
      params.id,
      params.jobId,
      params.status,
      params.rejectedCause,
      params.specifiedRejectedCause,
      params.appliedAt,
      params.updatedAt,
    );
  }
}
