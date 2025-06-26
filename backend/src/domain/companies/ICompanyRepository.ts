import { Company } from './Company';

export const COMPANY_REPOSITORY_SYMBOL = Symbol('ICompanyRepository');

export interface ICompanyRepository {
  findOneById(id: string): Promise<Company | null>;
  findAll(): Promise<Company[]>;

  save(company: Company): Promise<Company>;
  update(company: Company): Promise<Company>;
  delete(company: Company): Promise<void>;
}
