export class ApplyJobDto {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  jobType: string;
  jobStatus: string;
  jobUrl: string;
  jobPostedDate: Date;
  jobApplicationStatus: string;
  jobLocation?: string;
  jobSalary?: string;
}
