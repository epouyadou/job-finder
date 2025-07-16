
export const LINKED_IN_DOMAIN = 'linkedin.com';

export const LINKED_IN_JOB_DETAILS_SELECTOR: string = '.jobs-details';
export const LINKED_IN_JOB_TITLE_SELECTOR: string = 'h1 a';
export const LINKED_IN_JOB_COMPANY_SELECTOR: string = '.job-details-jobs-unified-top-card__company-name a';
export const LINKED_IN_JOB_DESCRIPTION_SELECTOR: string = '.jobs-description__content';
export const LINKED_IN_JOB_TYPE_SELECTOR: string = '.job-details-jobs-unified-top-card__job-insight > span > span:nth-child(2)';
export const LINKED_IN_JOB_LOCATION_SELECTOR: string = '.job-details-jobs-unified-top-card__primary-description-container span > span:nth-child(1)';
export const LINKED_IN_JOB_POSTED_DATE_SELECTOR: string = '.job-details-jobs-unified-top-card__primary-description-container span > span:nth-child(3)';

export const LINKED_IN_JOB_VIEW_PAGE_PATHNAME = '/jobs/view/';

export const LINKED_IN_CURRENT_JOB_ID_QUERY_PARAM_NAME = 'currentJobId';
export const LINKED_IN_JOB_VIEW_WITH_JOB_ID_IN_QUERY_PARAMS = [
  '/jobs/search/',
  '/jobs/collections/',
];

export const LINKED_IN_ELEMENT_SELECTOR_TO_INJECT_BUTTON = '.job-details-jobs-unified-top-card__container--two-pane .jobs-s-apply';