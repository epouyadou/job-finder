import { API_BASE_URL, API_ENDPOINTS, API_HEADERS } from '../constants/api.constant';
import { parseJobType } from '../core/JobTypeAdapter';
import { Website } from '../core/Website';
import { scrapeJob } from '../scrapers/Dispatcher';
import { ApplicationStatus } from '../types/ApplicationStatus';
import type { JobInfo } from '../types/JobInfo';
import { JobStatus } from '../types/JobStatus';

export class ApplyJobButton {
  static createButton(onClickCallback: () => void): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = 'job-finder-apply-button';
    button.textContent = 'Apply Now';

    if (Website.isLinkedIn()) {
      button.classList.add('linkedin-job-finder-apply-button');
    } else if (Website.isWttJ()) {
      button.classList.add('wttj-job-finder-apply-button');
    }

    button.addEventListener('click', (event) => {
      event.preventDefault();
      onClickCallback();
    });

    return button;
  }

  static attachToJobElement(jobElement: Element): void {
    const button = this.createButton(() => this.onClickApplyButton());
    jobElement.appendChild(button);
    console.log('[Job Extension] Apply Job button attached to job element');
  }

  static onClickApplyButton() {
    console.log('[Job Extension] Scraping job info...');
    
    const job = scrapeJob();

    if (!job) {
      console.log('[Job Extension] No job data found.');
      return;
    }

    console.log('[Job Extension] Scraped Job:', job);
    
    this.applyForJob(job)
      .then(() => console.log('[Job Extension] Job application submitted successfully.'))
      .catch((error) => console.error('[Job Extension] Error applying for job:', error));
  }

  static async applyForJob(job: JobInfo): Promise<void> {
    const jobData: ApplyJobDto = {
      companyName: job.company,
      jobTitle: job.title,
      jobDescription: job.description,
      jobType: parseJobType(job.type)?.value,
      jobStatus: JobStatus.OPEN.toString(),
      jobUrl: job.url,
      jobPostedDate: job.postedDate || new Date(),
      jobApplicationStatus: ApplicationStatus.APPLIED.toString(),
      jobLocation: job.location,
      jobSalary: job.salary,
    };

    
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.APPLY_JOB}`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      throw new Error('Failed to apply for job');
    }
  }
}

interface ApplyJobDto {
  companyName: string;
  jobTitle: string;
  jobDescription?: string;
  jobType?: string;
  jobStatus?: string;
  jobUrl: string;
  jobPostedDate: Date;
  jobApplicationStatus: string;
  jobLocation?: string;
  jobSalary?: string;
}

