import {
    DATE_TIME_SYMBOL,
    IDateTime,
} from '@application/abstractions/common/IDateTime';

export class MachineTime implements IDateTime {
  /**
   * Returns the current UTC date and time.
   * @returns {Date} The current UTC date and time.
   */
  utcNow(): Date {
    return new Date();
  }
}

export const MachineTimeProvider = {
  provide: DATE_TIME_SYMBOL,
  useClass: MachineTime,
};
