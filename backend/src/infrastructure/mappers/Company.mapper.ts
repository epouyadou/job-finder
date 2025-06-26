import { Company } from '@domain/companies/Company';

export type PersistedCompany = {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
};

export class CompanyMapper {
  static toDomain(persisted: PersistedCompany): Company {
    return Company.create({
      id: persisted.id,
      name: persisted.name,
      createdAt: new Date(persisted.created_at),
      updatedAt: new Date(persisted.updated_at),
    });
  }

  static AllToDomain(persistedCompanies: PersistedCompany[]): Company[] {
    return persistedCompanies.map((p) => CompanyMapper.toDomain(p));
  }
}
