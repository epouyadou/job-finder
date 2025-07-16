import { WTTJ_JOB_COMPANY_SELECTOR, WTTJ_JOB_DESCRIPTION_SELECTOR, WTTJ_JOB_DETAILS_SELECTOR, WTTJ_JOB_LOCATION_SELECTOR, WTTJ_JOB_PATHNAME_REGEX, WTTJ_JOB_POSTED_DATE_SELECTOR, WTTJ_JOB_SALARY_SELECTOR, WTTJ_JOB_TITLE_SELECTOR, WTTJ_JOB_TYPE_SELECTOR } from '../constants/WttJ.constant';
import { getContactsFromText } from '../core/ContactScrapper';
import { extractText } from '../core/DomTextExtractor';
import { getDateFromPostedDateText } from '../core/PostedDateScrapper';
import { removeAccents } from '../core/RemoveTextAccents';
import { getSalaryFromText } from '../core/SalaryScrapper';
import type { JobInfo } from '../types/JobInfo';



export function scrapeWelcomeToTheJungle(): JobInfo | null {
  if (!isJobPage(location.pathname)) {
      return null;
    }
  
    const jobUrl = location.pathname;
    const domain = location.hostname;
  
    const jobDetails = document.querySelector(WTTJ_JOB_DETAILS_SELECTOR);
    if (!jobDetails) {
      return null;
    }
  
    const jobCompany = jobDetails.querySelector(WTTJ_JOB_COMPANY_SELECTOR)?.textContent?.trim() || undefined;
    const jobTitle = jobDetails.querySelector(WTTJ_JOB_TITLE_SELECTOR)?.textContent?.trim() || undefined;
  
    if (!jobUrl || !jobTitle || !jobCompany) {
      return null;
    }
  
    const jobDescription = getJobDescription();
    
    let jobSalary = getJobSalary(jobDetails);
    if (!jobSalary) {
      jobSalary = jobDescription ? getSalaryFromText(jobDescription) : undefined;
    }

    const jobType = jobDetails.querySelector(WTTJ_JOB_TYPE_SELECTOR)?.textContent?.trim() || undefined;
    const jobLocation = jobDetails.querySelector(WTTJ_JOB_LOCATION_SELECTOR)?.textContent?.trim() || undefined;
    const jobContacts = jobDescription ? getContactsFromText(jobDescription) : undefined;
    const jobPostedDate = getJobPostedDate(jobDetails);

    const jobInfo: JobInfo = {
      url: `https://${domain}${jobUrl}`,
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

function isJobPage(pathname: string): boolean {
  return WTTJ_JOB_PATHNAME_REGEX.test(pathname);
}

function getJobDescription(): string | undefined {
  const descriptionElement = document.querySelector(WTTJ_JOB_DESCRIPTION_SELECTOR);
  
  if (!descriptionElement) {
    return undefined;
  }

  return removeAccents(extractText(descriptionElement).join('\n').trim());
}

function getJobSalary(jobDetails: Element): string | undefined {
  const salaryElement = jobDetails.querySelector(WTTJ_JOB_SALARY_SELECTOR);
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

function getJobPostedDate(jobDetails: Element): Date | undefined {
  const postedDateElement = jobDetails.querySelector(WTTJ_JOB_POSTED_DATE_SELECTOR);

  if (postedDateElement && postedDateElement.textContent) {
    return getDateFromPostedDateText(postedDateElement.textContent.trim());
  }

  return undefined;
}