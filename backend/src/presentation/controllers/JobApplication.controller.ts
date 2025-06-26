import { ApplyJobCommand } from '@application/job-applications/apply-job/ApplyJobCommand';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApplyJobDto } from '@presentation/controllers/dto/ApplyJob.dto';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('apply')
  async applyToJob(@Body() applyJobDto: ApplyJobDto): Promise<any> {
    const command: ApplyJobCommand = new ApplyJobCommand(
      applyJobDto.companyName,
      applyJobDto.jobTitle,
      applyJobDto.jobDescription,
      applyJobDto.jobType,
      applyJobDto.jobStatus,
      applyJobDto.jobUrl,
      applyJobDto.jobPostedDate,
      applyJobDto.jobApplicationStatus,
      applyJobDto.jobLocation,
      applyJobDto.jobSalary,
    );

    return this.commandBus.execute(command);
  }
}
