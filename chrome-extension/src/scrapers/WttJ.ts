import type { JobInfo } from '../types/JobInfo';

export function scrapeWelcomeToTheJungle(): JobInfo | null {
  const domain = location.hostname;
  const id = location.pathname;

  const company = document.querySelector('[data-testid="company-name"]')?.textContent?.trim() ?? '';
  const title = document.querySelector('[data-testid="job-title"]')?.textContent?.trim() ?? '';
  const description = document.querySelector('[data-testid="description"]')?.textContent?.trim() ?? '';

  return {
    id,
    domain,
    company,
    title,
    description,
  };
}