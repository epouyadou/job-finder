export type ApplicationRejectCauseType =
  | 'not_yet_rejected'
  | 'not_qualified'
  | 'overqualified'
  | 'position_closed'
  | 'no_response'
  | 'lack_of_experience'
  | 'other';

export class ApplicationRejectCause {
  static NOT_YET_REJECTED: ApplicationRejectCause = new ApplicationRejectCause(
    'not_yet_rejected',
  );
  static NOT_QUALIFIED: ApplicationRejectCause = new ApplicationRejectCause(
    'not_qualified',
  );
  static OVERQUALIFIED: ApplicationRejectCause = new ApplicationRejectCause(
    'overqualified',
  );
  static POSITION_CLOSED: ApplicationRejectCause = new ApplicationRejectCause(
    'position_closed',
  );
  static NO_RESPONSE: ApplicationRejectCause = new ApplicationRejectCause(
    'no_response',
  );
  static LACK_OF_EXPERIENCE: ApplicationRejectCause =
    new ApplicationRejectCause('lack_of_experience');
  static OTHER: ApplicationRejectCause = new ApplicationRejectCause('other');

  constructor(
    public readonly value: ApplicationRejectCauseType = 'not_yet_rejected',
  ) {}

  static fromString(value: string): ApplicationRejectCause {
    switch (value) {
      case 'not_yet_rejected':
        return ApplicationRejectCause.NOT_YET_REJECTED;
      case 'not_qualified':
        return ApplicationRejectCause.NOT_QUALIFIED;
      case 'overqualified':
        return ApplicationRejectCause.OVERQUALIFIED;
      case 'position_closed':
        return ApplicationRejectCause.POSITION_CLOSED;
      case 'no_response':
        return ApplicationRejectCause.NO_RESPONSE;
      case 'lack_of_experience':
        return ApplicationRejectCause.LACK_OF_EXPERIENCE;
      case 'other':
        return ApplicationRejectCause.OTHER;
      default:
        throw new Error(`Unknown application reject cause: ${value}`);
    }
  }

  toString(): string {
    return this.value;
  }

  equals(other: ApplicationRejectCause): boolean {
    return this.value === other.value;
  }
}
