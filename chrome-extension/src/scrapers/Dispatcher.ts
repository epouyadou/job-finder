import { Website } from '../core/Website';
import type { JobInfo } from '../types/JobInfo';
import { scrapeGeneric } from './Generic';
import { scrapeLinkedIn } from './Linkedin';
import { scrapeWelcomeToTheJungle } from './WttJ';

function validateJob(job: JobInfo): boolean {
  return !!(job.company && job.title);
}

export function scrapeJob(): JobInfo | null {
  const hostname = location.hostname;
  console.log(`Scraping job from: ${hostname}`);

  let job: JobInfo | null = null;

  if (Website.isLinkedIn()) {
    console.log('Detected LinkedIn job page');
    job = scrapeLinkedIn();
  } else if (Website.isWttJ()) {
    console.log('Detected Welcome to the Jungle job page');
    job = scrapeWelcomeToTheJungle();
  } else {
    job = scrapeGeneric();
  }
  
  if (job && validateJob(job)) {
    console.log('Job scraping successful:', job);
    return job;
  }

  console.warn('Job scraping failed or job is invalid:', job);
  return null;
}