import { getContactsFromText } from '../core/ContactScrapper';
import { extractText } from '../core/DomTextExtractor';
import { removeAccents } from '../core/RemoveTextAccents';
import { getSalaryFromText } from '../core/SalaryScrapper';
import type { JobInfo } from '../types/JobInfo';

const JOB_DETAILS_SELECTOR: string = 'div[data-testid="job-metadata-block"]';
const JOB_TITLE_SELECTOR: string = 'h2';
const JOB_COMPANY_SELECTOR: string = 'div a > span';

const JOB_TYPE_SELECTOR: string = 'i[name="contract"] + span';
const JOB_LOCATION_SELECTOR: string = 'i[name="location"] + span span';
const JOB_SALARY_SELECTOR: string = 'i[name="salary"]';

const JOB_DESCRIPTION_SELECTOR: string = 'div[data-testid="job-section-description"]';

const WTTJ_JOB_PATHNAME_REGEX = /^[a-z]{2,3}\/companies\/[a-zA-Z0-9-_]*\/jobs\/[a-zA-Z0-9-_]*$/g;

export function scrapeWelcomeToTheJungle(): JobInfo | null {
  if (!isJobPage(location.pathname)) {
      return null;
    }
  
    const jobId = location.pathname;
    const domain = location.hostname;
  
    const jobDetails = document.querySelector(JOB_DETAILS_SELECTOR);
    if (!jobDetails) {
      return null;
    }
  
    const jobCompany = jobDetails.querySelector(JOB_COMPANY_SELECTOR)?.textContent?.trim() || undefined;
    const jobTitle = jobDetails.querySelector(JOB_TITLE_SELECTOR)?.textContent?.trim() || undefined;
  
    if (!jobId || !jobTitle || !jobCompany) {
      return null;
    }
  
    const jobDescription = getJobDescription();
    
    let jobSalary = getJobSalary(jobDetails);
    if (!jobSalary) {
      jobSalary = jobDescription ? getSalaryFromText(jobDescription) : undefined;
    }

    const jobType = jobDetails.querySelector(JOB_TYPE_SELECTOR)?.textContent?.trim() || undefined;
    const jobLocation = jobDetails.querySelector(JOB_LOCATION_SELECTOR)?.textContent?.trim() || undefined;
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

function isJobPage(pathname: string): boolean {
  return WTTJ_JOB_PATHNAME_REGEX.test(pathname);
}

function getJobDescription(): string | undefined {
  const descriptionElement = document.querySelector(JOB_DESCRIPTION_SELECTOR);
  
  if (!descriptionElement) {
    return undefined;
  }

  return removeAccents(extractText(descriptionElement).join('\n').trim());
}

function getJobSalary(jobDetails: Element): string | undefined {
  const salaryElement = jobDetails.querySelector(JOB_SALARY_SELECTOR);
  if (!salaryElement) {
    return undefined;
  }

  const parent = salaryElement.parentElement;
  
  if (!parent) {
    return undefined;
  }

  const textNode = Array.from(parent.childNodes).find(
    node => node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim() !== ''
  );

  const text = textNode!.textContent!.trim();
  console.log(text);
}