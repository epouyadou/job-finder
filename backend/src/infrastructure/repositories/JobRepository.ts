import { IJobRepository } from '@domain/jobs/IJobRepository';
import { Job } from '@domain/jobs/Job';
import { RangeSalary, Salary, UndefinedSalary } from '@domain/jobs/JobSalary';
import { PostgresPool } from '@infrastructure/database/postgres/postgres';
import { JobMapper, PersistedJob } from '@infrastructure/mappers/Job.mapper';

export class JobRepository implements IJobRepository {
  constructor(private readonly postgres: PostgresPool) {}

  async findOneById(id: number): Promise<Job | null> {
    const query = `SELECT * FROM jobs WHERE id = $1`;
    const params = [id];
    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      return null;
    }

    return JobMapper.toDomain(result.rows[0] as PersistedJob);
  }

  async findAllByCompanyId(companyId: number): Promise<Job[]> {
    const query = `SELECT * FROM jobs WHERE company_id = $1`;
    const params = [companyId];
    const result = await this.postgres.query(query, params);
    if (result.rows.length === 0) {
      return [];
    }
    return JobMapper.AllToDomain(result.rows as PersistedJob[]);
  }

  async findAllByStatus(status: string): Promise<Job[]> {
    const query = `SELECT * FROM jobs WHERE status = $1`;
    const params = [status];
    const result = await this.postgres.query(query, params);
    if (result.rows.length === 0) {
      return [];
    }
    return JobMapper.AllToDomain(result.rows as PersistedJob[]);
  }

  async findAll(): Promise<Job[]> {
    const query = `SELECT * FROM jobs`;
    const result = await this.postgres.query(query);
    if (result.rows.length === 0) {
      return [];
    }
    return JobMapper.AllToDomain(result.rows as PersistedJob[]);
  }

  async save(job: Job): Promise<Job> {
    const query = `
      INSERT INTO jobs (company_id, title, description, type, status, url, location, salary_amount, salary_min_amount, salary_max_amount, salary_currency, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING *;
    `;
    const params = [
      job.companyId,
      job.title,
      job.description,
      job.type.toString(),
      job.status.toString(),
      job.url,
      job.location || null,
      job.salary instanceof Salary ? job.salary.amount : null,
      job.salary instanceof RangeSalary ? job.salary.min : null,
      job.salary instanceof RangeSalary ? job.salary.max : null,
      job.salary instanceof UndefinedSalary ? null : job.salary.currency,
      job.createdAt,
      job.updatedAt,
    ];

    const result = await this.postgres.query(query, params);
    if (result.rows.length === 0) {
      throw new Error('Failed to save job');
    }
    return JobMapper.toDomain(result.rows[0] as PersistedJob);
  }

  async update(job: Job): Promise<Job> {
    const query = `
      UPDATE jobs
      SET company_id = $1, title = $2, description = $3, type = $4, status = $5, url = $6, location = $7, salary_amount = $8, salary_min_amount = $9, salary_max_amount = $10, salary_currency = $11, created_at = $12, updated_at = $13
      WHERE id = $14
      RETURNING *;
    `;
    const params = [
      job.companyId,
      job.title,
      job.description,
      job.type.toString(),
      job.status.toString(),
      job.url,
      job.location || null,
      job.salary instanceof Salary ? job.salary.amount : null,
      job.salary instanceof RangeSalary ? job.salary.min : null,
      job.salary instanceof RangeSalary ? job.salary.max : null,
      job.salary instanceof UndefinedSalary ? null : job.salary.currency,
      job.createdAt,
      job.updatedAt,
      job.id,
    ];

    const result = await this.postgres.query(query, params);
    if (result.rows.length === 0) {
      throw new Error('Failed to update job');
    }

    return JobMapper.toDomain(result.rows[0] as PersistedJob);
  }

  async delete(job: Job): Promise<void> {
    const query = `DELETE FROM jobs WHERE id = $1`;
    const params = [job.id];
    const result = await this.postgres.query(query, params);
    if (result.rowCount === 0) {
      throw new Error('Failed to delete job');
    }
  }
}
