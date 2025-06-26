export class ApplyJobCommand {
  constructor(
    public readonly companyName: string,
    public readonly jobTitle: string,
    public readonly jobDescription: string,
    public readonly jobType: string,
    public readonly jobStatus: string,
    public readonly jobUrl: string,
    public readonly jobPostedDate: Date,
    public readonly jobApplicationStatus: string,
    public readonly jobLocation?: string,
    public readonly jobSalary?: string,
  ) {}
}
