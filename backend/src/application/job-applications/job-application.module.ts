import { CommonImplModule } from '@infrastructure/common/common-impl.module';
import { RepositoryImplModule } from '@infrastructure/repositories/repository-impl.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApplyJobHandler } from './apply-job/ApplyJobHandler';

@Module({
  imports: [CqrsModule, RepositoryImplModule, CommonImplModule],
  providers: [ApplyJobHandler],
})
export class JobApplicationModule {}
