export type ApplicationStatusType =
  | 'applied'
  | 'interviewing'
  | 'offered'
  | 'rejected'
  | 'hired';

export class ApplicationStatus {
  static APPLIED: ApplicationStatus = new ApplicationStatus('applied');
  static INTERVIEWING: ApplicationStatus = new ApplicationStatus(
    'interviewing',
  );
  static OFFERED: ApplicationStatus = new ApplicationStatus('offered');
  static REJECTED: ApplicationStatus = new ApplicationStatus('rejected');
  static HIRED: ApplicationStatus = new ApplicationStatus('hired');

  constructor(public readonly value: ApplicationStatusType = 'applied') {}

  static fromString(value: string): ApplicationStatus {
    switch (value) {
      case 'applied':
        return ApplicationStatus.APPLIED;
      case 'interviewing':
        return ApplicationStatus.INTERVIEWING;
      case 'offered':
        return ApplicationStatus.OFFERED;
      case 'rejected':
        return ApplicationStatus.REJECTED;
      case 'hired':
        return ApplicationStatus.HIRED;
      default:
        throw new Error(`Unknown application status: ${value}`);
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: ApplicationStatus): boolean {
    return this.value === other.value;
  }
}
