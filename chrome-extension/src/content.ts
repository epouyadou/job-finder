import { scrapeJob } from './scrapers/Dispatcher';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  await sleep(10000); // Wait for the page to load completely

  console.log('[Job Extension] Scraping job info...');
  const job = scrapeJob();

  if (job) {
    console.log('[Job Extension] Scraped Job:', job);
  } else {
    console.log('[Job Extension] No job data found.');
  }
})().catch(error => {
  console.error('[Job Extension] Error scraping job info:', error);
});
