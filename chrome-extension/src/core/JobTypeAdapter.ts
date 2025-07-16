import { JobType } from '../types/JobType';

const FULL_TIME_ALIAS: string[] = [
  'temps plein',
  'full time',
  'full-time',
  'fulltime',
  'cdi',
];

const PART_TIME_ALIAS: string[] = [
  'temps partiel',
  'part time',
  'part-time',
  'parttime',
  'cdd',
];

const CONTRACT_ALIAS: string[] = [
  'contrat',
  'contract',
  'freelance',
  'freelancing',
];

const INTERNSHIP_ALIAS: string[] = [
  'stage',
  'internship',
  'intern',
  'alternance',
];

export function parseJobType(text?: string): JobType | undefined {
  if (!text) {
    return undefined;
  }

  const lowerText = text.toLowerCase();

  if (FULL_TIME_ALIAS.includes(lowerText)) {
    return JobType.FULL_TIME;
  } else if (PART_TIME_ALIAS.includes(lowerText)) {
    return JobType.PART_TIME;
  } else if (CONTRACT_ALIAS.includes(lowerText)) {
    return JobType.CONTRACT;
  } else if (INTERNSHIP_ALIAS.includes(lowerText)) {
    return JobType.INTERNSHIP;
  }
  
  return undefined;
}