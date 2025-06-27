import type { JobInfo } from '../types/JobInfo';

export function scrapeLinkedIn(): JobInfo | null {
  const domain = location.hostname;

  // LinkedIn job ID
  const id = document.querySelector('[data-job-id]')?.getAttribute('data-job-id')
    ?? location.pathname;

  const company = document.querySelector('.topcard__org-name-link, .topcard__flavor')?.textContent?.trim() ?? '';
  const title = document.querySelector('.topcard__title')?.textContent?.trim() ?? '';
  const description = document.querySelector('.description__text, .show-more-less-html__markup')?.textContent?.trim() ?? '';

  return {
    domain,
    id,
    company,
    title,
    description,
  };
}