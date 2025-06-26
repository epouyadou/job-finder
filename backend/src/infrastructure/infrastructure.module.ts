import { Module } from '@nestjs/common';
import { CommonImplModule } from './common/common-impl.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { RepositoryImplModule } from './repositories/repository-impl.module';

@Module({
  imports: [PostgresModule, RepositoryImplModule, CommonImplModule],
})
export class InfrastructureModule {}
