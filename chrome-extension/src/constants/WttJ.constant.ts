export const WTTJ_DOMAIN = 'welcometothejungle.com';

export const WTTJ_JOB_DETAILS_SELECTOR: string = 'div[data-testid="job-metadata-block"]';
export const WTTJ_JOB_TITLE_SELECTOR: string = 'h2';
export const WTTJ_JOB_COMPANY_SELECTOR: string = 'div a > span';

export const WTTJ_JOB_TYPE_SELECTOR: string = 'i[name="contract"] + span';
export const WTTJ_JOB_LOCATION_SELECTOR: string = 'i[name="location"] + span span';
export const WTTJ_JOB_SALARY_SELECTOR: string = 'i[name="salary"]';
export const WTTJ_JOB_POSTED_DATE_SELECTOR: string = 'time + span';

export const WTTJ_JOB_DESCRIPTION_SELECTOR: string = 'div[data-testid="job-section-description"]';

export const WTTJ_JOB_PATHNAME_REGEX = /^[a-z]{2,3}\/companies\/[a-zA-Z0-9-_]*\/jobs\/[a-zA-Z0-9-_]*$/g;

export const WTTJ_ELEMENT_SELECTOR_TO_INJECT_BUTTON = 'a[data-testid="job_header-button-apply"]';