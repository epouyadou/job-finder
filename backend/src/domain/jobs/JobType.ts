export type JobTypeType = 'full_time' | 'part_time' | 'contract' | 'internship';

export class JobType {
  static FULL_TIME: JobType = new JobType('full_time');
  static PART_TIME: JobType = new JobType('part_time');
  static CONTRACT: JobType = new JobType('contract');
  static INTERNSHIP: JobType = new JobType('internship');

  constructor(public readonly value: JobTypeType) {}

  static fromString(value: string): JobType {
    switch (value) {
      case 'full_time':
        return JobType.FULL_TIME;
      case 'part_time':
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
