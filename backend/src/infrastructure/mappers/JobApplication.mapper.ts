import {
  ApplicationRejectCause,
  ApplicationRejectCauseType,
} from '@domain/job-applications/ApplicationRejectCause';
import {
  ApplicationStatus,
  ApplicationStatusType,
} from '@domain/job-applications/ApplicationStatus';
import { JobApplication } from '@domain/job-applications/JobApplication';

export type PersistedJobApplication = {
  id: number;
  job_id: number;
  status: ApplicationStatusType;
  rejected_cause: ApplicationRejectCauseType;
  specified_rejected_cause: string | null;
  applied_at: Date;
  updated_at: Date;
};

export class JobApplicationMapper {
  static toDomain(persisted: PersistedJobApplication): JobApplication {
    return JobApplication.create({
      id: persisted.id,
      jobId: persisted.job_id,
      status: ApplicationStatus.fromString(persisted.status),
      rejectedCause: ApplicationRejectCause.fromString(
        persisted.rejected_cause,
      ),
      specifiedRejectedCause: persisted.specified_rejected_cause || undefined,
      appliedAt: new Date(persisted.applied_at),
      updatedAt: new Date(persisted.updated_at),
    });
  }

  static AllToDomain(persisted: PersistedJobApplication[]): JobApplication[] {
    return persisted.map((p) => JobApplicationMapper.toDomain(p));
  }
}
