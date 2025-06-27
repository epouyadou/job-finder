import { scrapeJob } from './scrapers/Dispatcher';

console.log('[Job Extension] Scraping job info...');

const job = scrapeJob();

if (job) {
  console.log('[Job Extension] Scraped Job:', job);
} else {
  console.log('[Job Extension] No job data found.');
}