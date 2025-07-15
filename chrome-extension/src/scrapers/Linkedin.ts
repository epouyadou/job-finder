import { getContactsFromText } from '../core/ContactScrapper';
import { extractText } from '../core/DomTextExtractor';
import { removeAccents } from '../core/RemoveTextAccents';
import { getSalaryFromText } from '../core/SalaryScrapper';
import type { JobInfo } from '../types/JobInfo';

const JOB_DETAILS_SELECTOR: string = '.jobs-details';
const JOB_TITLE_SELECTOR: string = 'h1 a';
const JOB_COMPANY_SELECTOR: string = '.job-details-jobs-unified-top-card__company-name a';
const JOB_DESCRIPTION_SELECTOR: string = '.jobs-description__content';
const JOB_TYPE_SELECTOR: string = '.job-details-jobs-unified-top-card__job-insight > span > span:nth-child(2)';
const JOB_LOCATION_SELECTOR: string = '.job-details-jobs-unified-top-card__primary-description-container > span > span:nth-child(1)';

const JOB_VIEW_PAGE_PATHNAME = '/jobs/view/';

const CURRENT_JOB_ID_QUERY_PARAM_NAME = 'currentJobId';
const JOB_VIEW_WITH_JOB_ID_IN_QUERY_PARAMS = [
  '/jobs/search/',
  '/jobs/collections/',
];

export function scrapeLinkedIn(): JobInfo | null {
  const searchParams = new URLSearchParams(location.search);

  if (!isJobPage(location.pathname, searchParams)) {
    console.warn('Not a LinkedIn job page');
    return null;
  }

  const jobDetails = document.querySelector(JOB_DETAILS_SELECTOR);
  if (!jobDetails) {
    console.warn('Job details element not found');
    return null;
  }

  const jobId = getJobId(location.pathname, searchParams);
  const domain = location.hostname;
  const jobTitle = jobDetails.querySelector(JOB_TITLE_SELECTOR)?.textContent?.trim() || undefined;
  const jobCompany = jobDetails.querySelector(JOB_COMPANY_SELECTOR)?.textContent?.trim() || undefined;

  if (!jobId || !jobTitle || !jobCompany) {
    console.warn(`Job ID, title, or company not found (Job ID: ${jobId}, Title: ${jobTitle}, Company: ${jobCompany})`);
    return null;
  }

  const jobDescription = getJobDescription();
  const jobSalary = jobDescription ? getSalaryFromText(jobDescription) : undefined;
  const jobType = getJobType();
  const jobLocation = getJobLocation();
  const jobContacts = jobDescription ? getContactsFromText(jobDescription) : undefined;

  const jobInfo: JobInfo = {
    id: jobId,
    domain: domain,
    company: jobCompany,
    title: jobTitle,
    description: jobDescription,
    salary: jobSalary,
    type: jobType,
    location: jobLocation,
    contacts: jobContacts,
  };

  return jobInfo;
}

function isJobPageWithJobIdInQueryParams(pathname: string, searchParams: URLSearchParams): boolean {
  return JOB_VIEW_WITH_JOB_ID_IN_QUERY_PARAMS.some(
    prefix => pathname.startsWith(prefix) 
    && searchParams.has(CURRENT_JOB_ID_QUERY_PARAM_NAME)
  );
}

function isJobPage(pathname: string, searchParams: URLSearchParams): boolean {
  return pathname.startsWith(JOB_VIEW_PAGE_PATHNAME) 
      || isJobPageWithJobIdInQueryParams(pathname, searchParams)
}

function getJobId(pathname: string, searchParams: URLSearchParams): string | undefined {
  if (pathname.startsWith(JOB_VIEW_PAGE_PATHNAME)) {
    console.log('--- Id in pathname:', pathname);
    const id = pathname.split('/').pop();
    return id || undefined;
  } else if (isJobPageWithJobIdInQueryParams(pathname, searchParams)) {
    console.log('--- Id in search params:', searchParams.get(CURRENT_JOB_ID_QUERY_PARAM_NAME));
    return searchParams.get(CURRENT_JOB_ID_QUERY_PARAM_NAME) || undefined;
  }
  return undefined;
}

function getJobDescription(): string | undefined {
  const descriptionElement = document.querySelector(JOB_DESCRIPTION_SELECTOR);
  
  if (!descriptionElement) {
    return undefined;
  }

  return removeAccents(extractText(descriptionElement).join('\n').trim());
}

function getJobType(): string | undefined {
  const jobTypeElement = document.querySelector(JOB_TYPE_SELECTOR);
  if (jobTypeElement) {
    return jobTypeElement.textContent?.trim();
  }
  return undefined;
}

function getJobLocation(): string | undefined {
  const jobLocationElement = document.querySelector(JOB_LOCATION_SELECTOR);
  if (jobLocationElement) {
    return jobLocationElement.textContent?.trim();
  }
  return undefined;
}

