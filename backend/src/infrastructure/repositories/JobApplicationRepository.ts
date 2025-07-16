import { IJobApplicationRepository } from '@domain/job-applications/IJobApplicationRepository';
import { JobApplication } from '@domain/job-applications/JobApplication';
import { PostgresPool } from '@infrastructure/database/postgres/postgres';
import {
  JobApplicationMapper,
  PersistedJobApplication,
} from '@infrastructure/mappers/JobApplication.mapper';
import { Inject } from '@nestjs/common';

export class JobApplicationRepository implements IJobApplicationRepository {
  constructor(@Inject() private readonly postgres: PostgresPool) {}

  async findOneById(id: number): Promise<JobApplication | null> {
    const query = `SELECT * FROM jobfinder.job_applications WHERE id = $1`;
    const params = [id];
    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      return null;
    }

    return JobApplicationMapper.toDomain(
      result.rows[0] as PersistedJobApplication,
    );
  }

  async findAllByJobId(jobId: number): Promise<JobApplication[]> {
    const query = `SELECT * FROM jobfinder.job_applications WHERE job_id = $1`;
    const params = [jobId];
    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      return [];
    }

    return JobApplicationMapper.AllToDomain(
      result.rows as PersistedJobApplication[],
    );
  }

  async findAllByStatus(status: string): Promise<JobApplication[]> {
    const query = `SELECT * FROM jobfinder.job_applications WHERE status = $1`;
    const params = [status];
    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      return [];
    }

    return JobApplicationMapper.AllToDomain(
      result.rows as PersistedJobApplication[],
    );
  }

  async findAll(): Promise<JobApplication[]> {
    const query = `SELECT * FROM jobfinder.job_applications`;
    const result = await this.postgres.query(query);

    if (result.rows.length === 0) {
      return [];
    }

    return JobApplicationMapper.AllToDomain(
      result.rows as PersistedJobApplication[],
    );
  }

  async save(jobApplication: JobApplication): Promise<JobApplication> {
    const query = `
        INSERT INTO jobfinder.job_applications (job_id, status, rejected_cause, specified_rejected_cause, applied_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *`;
    const params = [
      jobApplication.jobId,
      jobApplication.status.toString(),
      jobApplication.rejectedCause.toString(),
      jobApplication.specifiedRejectedCause || null,
      jobApplication.appliedAt,
      jobApplication.updatedAt,
    ];

    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      throw new Error('Failed to save job application');
    }

    return JobApplicationMapper.toDomain(
      result.rows[0] as PersistedJobApplication,
    );
  }

  async update(jobApplication: JobApplication): Promise<JobApplication> {
    const query = `
      UPDATE jobfinder.job_applications
      SET status = $1, rejected_cause = $2, specified_rejected_cause = $3, applied_at = $4, updated_at = $5
      WHERE id = $6
      RETURNING *`;
    const params = [
      jobApplication.status.toString(),
      jobApplication.rejectedCause.toString(),
      jobApplication.specifiedRejectedCause || null,
      jobApplication.appliedAt,
      jobApplication.updatedAt,
      jobApplication.id,
    ];

    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      throw new Error('Failed to update job application');
    }

    return JobApplicationMapper.toDomain(
      result.rows[0] as PersistedJobApplication,
    );
  }

  async delete(jobApplication: JobApplication): Promise<void> {
    const query = `
      DELETE FROM jobfinder.job_applications
      WHERE id = $1`;
    const params = [jobApplication.id];

    const result = await this.postgres.query(query, params);

    if (result.rowCount === 0) {
      throw new Error('Failed to delete job application');
    }
  }
}
