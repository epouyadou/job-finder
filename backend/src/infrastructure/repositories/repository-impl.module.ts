import { Module } from '@nestjs/common';
import { RepositoryProviders } from './RepositoryProviders';

@Module({
  providers: [...RepositoryProviders],
  exports: [...RepositoryProviders],
})
export class RepositoryImplModule {}
