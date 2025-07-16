import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JobApplicationController } from './controllers/JobApplication.controller';

@Module({
  imports: [CqrsModule, InfrastructureModule],
  controllers: [JobApplicationController],
})
export class PresentationModule {}
