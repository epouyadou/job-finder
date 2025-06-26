import { InfrastructureModule } from '@infrastructure/infrastructure.module';
import { Module } from '@nestjs/common';
import { JobApplicationController } from './controllers/JobApplication.controller';

@Module({
  imports: [InfrastructureModule],
  controllers: [JobApplicationController],
})
export class PresentationModule {}
