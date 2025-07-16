export type JobTypeType = 'full_time' | 'part_time' | 'contract' | 'internship';

export class JobType {
  static FULL_TIME: JobType = new JobType('full_time');
  static PART_TIME: JobType = new JobType('part_time');
  static CONTRACT: JobType = new JobType('contract');
  static INTERNSHIP: JobType = new JobType('internship');

  public readonly value: JobTypeType;

  constructor(value: JobTypeType) {
    this.value = value;
  }

  static fromString(value: string): JobType {
    switch (value) {
      case 'full-time':
        return JobType.FULL_TIME;
      case 'part-time':
        return JobType.PART_TIME;
      case 'contract':
        return JobType.CONTRACT;
      case 'internship':
        return JobType.INTERNSHIP;
      default:
        throw new Error(`Invalid job type: ${value}`);
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: JobType): boolean {
    return this.value === other.value;
  }
}
