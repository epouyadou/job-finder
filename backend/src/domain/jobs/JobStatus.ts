export type JobStatusType = 'open' | 'closed' | 'archived';

export class JobStatus {
  static OPEN: JobStatus = new JobStatus('open');
  static CLOSED: JobStatus = new JobStatus('closed');
  static ARCHIVED: JobStatus = new JobStatus('archived');

  constructor(public readonly value: JobStatusType) {}

  static fromString(value: string): JobStatus {
    switch (value) {
      case 'open':
        return JobStatus.OPEN;
      case 'closed':
        return JobStatus.CLOSED;
      case 'archived':
        return JobStatus.ARCHIVED;
      default:
        throw new Error(`Invalid job status: ${value}`);
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: JobStatus): boolean {
    return this.value === other.value;
  }
}
