import type { JobInfo } from '../types/JobInfo';
import { scrapeGeneric } from './Generic';
import { scrapeLinkedIn } from './Linkedin';
import { scrapeWelcomeToTheJungle } from './WttJ';

function validateJob(job: JobInfo): boolean {
  return !!(job.company && job.title);
}

export function scrapeJob(): JobInfo | null {
  const hostname = location.hostname;

  let job: JobInfo | null = null;

  if (hostname.includes('linkedin.com')) {
    job = scrapeLinkedIn();
  } else if (hostname.includes('welcometothejungle.com')) {
    job = scrapeWelcomeToTheJungle();
  } else {
    job = scrapeGeneric();
  }

  if (job && validateJob(job)) {
    return job;
  }

  return null;
}