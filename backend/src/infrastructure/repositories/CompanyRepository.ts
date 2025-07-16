import { Company } from '@domain/companies/Company';
import { ICompanyRepository } from '@domain/companies/ICompanyRepository';
import { PostgresPool } from '@infrastructure/database/postgres/postgres';
import {
  CompanyMapper,
  PersistedCompany,
} from '@infrastructure/mappers/Company.mapper';
import { Inject } from '@nestjs/common';

export class CompanyRepository implements ICompanyRepository {
  constructor(@Inject() private readonly postgres: PostgresPool) {}

  async findOneById(id: number): Promise<Company | null> {
    const query = `SELECT * FROM jobfinder.companies WHERE id = $1`;
    const params = [id];
    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      return null;
    }

    return CompanyMapper.toDomain(result.rows[0] as PersistedCompany);
  }

  async findOneByName(name: string): Promise<Company | null> {
    const query = `SELECT * FROM jobfinder.companies WHERE name = $1`;
    const params = [name];
    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      return null;
    }

    return CompanyMapper.toDomain(result.rows[0] as PersistedCompany);
  }

  async findAll(): Promise<Company[]> {
    const query = `SELECT * FROM jobfinder.companies`;
    const result = await this.postgres.query(query);

    if (result.rows.length === 0) {
      return [];
    }

    return CompanyMapper.AllToDomain(result.rows as PersistedCompany[]);
  }

  async save(company: Company): Promise<Company> {
    const query = `
        INSERT INTO jobfinder.companies (name, created_at, updated_at) 
        VALUES ($1, $2, $3) 
        RETURNING *`;
    const params = [company.name, company.createdAt, company.updatedAt];
    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      throw new Error('Failed to save company');
    }

    return CompanyMapper.toDomain(result.rows[0] as PersistedCompany);
  }

  async update(company: Company): Promise<Company> {
    const query = `
        UPDATE jobfinder.companies 
        SET name = $1, updated_at = $2 
        WHERE id = $3 
        RETURNING *`;
    const params = [company.name, company.updatedAt, company.id];
    const result = await this.postgres.query(query, params);

    if (result.rows.length === 0) {
      throw new Error('Failed to update company');
    }

    return CompanyMapper.toDomain(result.rows[0] as PersistedCompany);
  }

  async delete(company: Company): Promise<void> {
    const query = `
        DELETE FROM jobfinder.companies 
        WHERE id = $1`;
    const params = [company.id];
    const result = await this.postgres.query(query, params);

    if (result.rowCount === 0) {
      throw new Error('Failed to delete company');
    }
  }
}
