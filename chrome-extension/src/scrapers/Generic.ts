import type { JobInfo } from '../types/JobInfo';

export function scrapeGeneric(): JobInfo | null {
  const domain = location.hostname;
  const id = location.pathname;

  // Try to guess
  const title = document.querySelector('h1, h2')?.textContent?.trim() ?? '';
  const description = document.querySelector('article, main, section')?.textContent?.trim() ?? '';

  return {
    id,
    domain,
    company: '',
    title,
    description,
  };
}