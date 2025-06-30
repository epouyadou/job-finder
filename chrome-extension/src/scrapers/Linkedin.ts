import { findPhoneNumbersInText, type NumberFound } from 'libphonenumber-js';
import type { JobInfo } from '../types/JobInfo';

const JOB_DETAILS_SELECTOR: string = '#job-details';
const JOB_TITLE_SELECTOR: string = 'h1 a';
const JOB_COMPANY_SELECTOR: string = '.ob-details-jobs-unified-top-card__company-name a';
const JOB_DESCRIPTION_SELECTOR: string = '.jobs-description__content';
const JOB_TYPE_SELECTOR: string = '.job-details-jobs-unified-top-card__job-insight > span > span:nth-child(2)';
const JOB_LOCATION_SELECTOR: string = '.job-details-jobs-unified-top-card__primary-description-container > span > span:nth-child(1)';

const JOB_VIEW_PAGE_PATHNAME = '/jobs/view/';
const JOB_SEARCH_PAGE_PATHNAME = '/jobs/search/';
const CURRENT_JOB_ID_QUERY_PARAM_NAME: string = 'currentJobId';

const SALARY_REGEX: RegExp = /(?:remuneration | salaire | salary)(?:\s*:?\s*)((?:\d+(?:,)?)+(?:K|M)?)(?:\s*-\s*((?:\d+(?:,)?)+(?:K|M)?))?\s*(€|\$|£|¥)?/gi;
const EMAIL_REGEX: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

export function scrapeLinkedIn(): JobInfo | null {
  if (!isJobPage(location.pathname)) {
    return null;
  }

  const domain = location.hostname;

  const jobDetails = document.querySelector(JOB_DETAILS_SELECTOR);
  if (!jobDetails) {
    return null;
  }

  const jobId = getJobId(location.pathname, new URLSearchParams(location.search));
  const jobTitle = jobDetails.querySelector(JOB_TITLE_SELECTOR)?.textContent?.trim() || undefined;
  const jobCompany = jobDetails.querySelector(JOB_COMPANY_SELECTOR)?.textContent?.trim() || undefined;

  if (!jobId || !jobTitle || !jobCompany) {
    return null;
  }

  const jobDescription = getJobDescription();
  const jobSalary = jobDescription ? getSalaryFromDescription(jobDescription) : undefined;
  const jobType = getJobType();
  const jobLocation = getJobLocation();
  const jobContacts = jobDescription ? getContacts(jobDescription) : undefined;

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

function isJobPage(pathname: string): boolean {
  return pathname.startsWith(JOB_VIEW_PAGE_PATHNAME) || pathname.startsWith(JOB_SEARCH_PAGE_PATHNAME);
}

function getJobId(pathname: string, searchParams: URLSearchParams): string | undefined {
  if (pathname.startsWith(JOB_VIEW_PAGE_PATHNAME)) {
    const id = pathname.split('/').pop();
    return id || undefined;
  } else if (pathname.startsWith(JOB_SEARCH_PAGE_PATHNAME)) {
    return searchParams.get(CURRENT_JOB_ID_QUERY_PARAM_NAME) || undefined;
  }
  return undefined;
}

function getJobDescription(): string | undefined {
  const descriptionElement = document.querySelector(JOB_DESCRIPTION_SELECTOR);
  
  if (descriptionElement) {
    return removeAccents(extractText(descriptionElement).join('\n').trim());
  }

  return undefined;
}

// Recursively extract text from child nodes and return as an array of strings
function extractText(element: Element): string[] {
  const textArray: string[] = [];
  
  Array.from(element.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        textArray.push(text);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      textArray.push(...extractText(node as Element));
    }
  });

  return textArray;
}

function getSalaryFromDescription(description: string): string | undefined {
  const match = SALARY_REGEX.exec(description);
  if (match) {
    const minSalary = match[1];
    const maxSalary = match[2];
    const currency = match[3];
    return `${minSalary} - ${maxSalary} ${currency}`.trim();
  }
  return undefined;
}

function removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
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

function getContacts(description: string): string[] {
  const contacts = new Set<string>();

  const emails = description.match(EMAIL_REGEX);
  if (emails) {
    emails.forEach(email => contacts.add(email));
  }

  findPhoneNumbersInText(description).forEach((phone: NumberFound) => {
    if (phone.number) {
      contacts.add(phone.number.formatInternational());
    }
  });

  return Array.from(contacts);
}