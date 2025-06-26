import { Module } from '@nestjs/common';
import { JobApplicationModule } from './job-applications/job-application.module';

@Module({
  imports: [JobApplicationModule],
})
export class ApplicationModule {}
