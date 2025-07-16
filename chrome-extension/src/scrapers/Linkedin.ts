import { LINKED_IN_CURRENT_JOB_ID_QUERY_PARAM_NAME, LINKED_IN_JOB_COMPANY_SELECTOR, LINKED_IN_JOB_DESCRIPTION_SELECTOR, LINKED_IN_JOB_DETAILS_SELECTOR, LINKED_IN_JOB_LOCATION_SELECTOR, LINKED_IN_JOB_POSTED_DATE_SELECTOR, LINKED_IN_JOB_TITLE_SELECTOR, LINKED_IN_JOB_TYPE_SELECTOR, LINKED_IN_JOB_VIEW_PAGE_PATHNAME, LINKED_IN_JOB_VIEW_WITH_JOB_ID_IN_QUERY_PARAMS } from '../constants/Linkedin.constant';
import { getContactsFromText } from '../core/ContactScrapper';
import { extractText } from '../core/DomTextExtractor';
import { getDateFromPostedDateText } from '../core/PostedDateScrapper';
import { removeAccents } from '../core/RemoveTextAccents';
import { getSalaryFromText } from '../core/SalaryScrapper';
import type { JobInfo } from '../types/JobInfo';



export function scrapeLinkedIn(): JobInfo | null {
  const searchParams = new URLSearchParams(location.search);

  if (!isJobPage(location.pathname, searchParams)) {
    console.warn('Not a LinkedIn job page');
    return null;
  }

  const jobDetails = document.querySelector(LINKED_IN_JOB_DETAILS_SELECTOR);
  if (!jobDetails) {
    console.warn('Job details element not found');
    return null;
  }

  const jobId = getJobId(location.pathname, searchParams);
  const domain = location.hostname;
  const jobTitle = jobDetails.querySelector(LINKED_IN_JOB_TITLE_SELECTOR)?.textContent?.trim() || undefined;
  const jobCompany = jobDetails.querySelector(LINKED_IN_JOB_COMPANY_SELECTOR)?.textContent?.trim() || undefined;

  if (!jobId || !jobTitle || !jobCompany) {
    console.warn(`Job ID, title, or company not found (Job ID: ${jobId}, Title: ${jobTitle}, Company: ${jobCompany})`);
    return null;
  }

  const jobDescription = getJobDescription();
  const jobSalary = jobDescription ? getSalaryFromText(jobDescription) : undefined;
  const jobType = getJobType();
  const jobLocation = getJobLocation();
  const jobContacts = jobDescription ? getContactsFromText(jobDescription) : undefined;
  const jobPostedDate = getJobPostedDate();

  const jobInfo: JobInfo = {
    url: `https://${domain}/jobs/view/${jobId}`,
    domain: domain,
    company: jobCompany,
    title: jobTitle,
    description: jobDescription,
    salary: jobSalary,
    type: jobType,
    location: jobLocation,
    contacts: jobContacts,
    postedDate: jobPostedDate,
  };

  return jobInfo;
}

function isJobPageWithJobIdInQueryParams(pathname: string, searchParams: URLSearchParams): boolean {
  return LINKED_IN_JOB_VIEW_WITH_JOB_ID_IN_QUERY_PARAMS.some(
    prefix => pathname.startsWith(prefix) 
    && searchParams.has(LINKED_IN_CURRENT_JOB_ID_QUERY_PARAM_NAME)
  );
}

function isJobPage(pathname: string, searchParams: URLSearchParams): boolean {
  return pathname.startsWith(LINKED_IN_JOB_VIEW_PAGE_PATHNAME) 
      || isJobPageWithJobIdInQueryParams(pathname, searchParams)
}

function getJobId(pathname: string, searchParams: URLSearchParams): string | undefined {
  if (pathname.startsWith(LINKED_IN_JOB_VIEW_PAGE_PATHNAME)) {
    const id = pathname.split('/').pop();
    return id || undefined;
  } else if (isJobPageWithJobIdInQueryParams(pathname, searchParams)) {
    return searchParams.get(LINKED_IN_CURRENT_JOB_ID_QUERY_PARAM_NAME) || undefined;
  }
  return undefined;
}

function getJobDescription(): string | undefined {
  const descriptionElement = document.querySelector(LINKED_IN_JOB_DESCRIPTION_SELECTOR);
  
  if (!descriptionElement) {
    return undefined;
  }

  return removeAccents(extractText(descriptionElement).join('\n').trim());
}

function getJobType(): string | undefined {
  const jobTypeElement = document.querySelector(LINKED_IN_JOB_TYPE_SELECTOR);
  if (jobTypeElement) {
    return jobTypeElement.textContent?.trim();
  }
  return undefined;
}

function getJobLocation(): string | undefined {
  const jobLocationElement = document.querySelector(LINKED_IN_JOB_LOCATION_SELECTOR);
  if (jobLocationElement) {
    return jobLocationElement.textContent?.trim();
  }
  return undefined;
}

function getJobPostedDate(): Date | undefined {
  const postedDateElement = document.querySelector(LINKED_IN_JOB_POSTED_DATE_SELECTOR);

  console.log('[Job Extension] Scraping posted date from LinkedIn job page:', postedDateElement);
  console.log('[Job Extension] Posted date element text content:', postedDateElement?.textContent);

  if (postedDateElement && postedDateElement.textContent) {
    console.log('[Job Extension] Scraping posted date from LinkedIn job page');
    return getDateFromPostedDateText(postedDateElement.textContent.trim());
  }

  console.warn('[Job Extension] Posted date element not found or has no text content');

  return undefined;
}