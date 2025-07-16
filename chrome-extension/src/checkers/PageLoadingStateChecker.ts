import { LINKED_IN_DOMAIN, LINKED_IN_ELEMENT_SELECTOR_TO_INJECT_BUTTON } from '../constants/Linkedin.constant';
import { WTTJ_JOB_DETAILS_SELECTOR } from '../constants/WttJ.constant';


export class PageLoadingStateChecker {

  public static isPageLoaded(): boolean {
    let isLoaded = document.readyState === 'complete' || document.readyState === 'interactive';
    
    if (!isLoaded) {
      console.warn('[PageLoadingStateChecker] Page is not fully loaded yet.');
      return false;
    }

    if (location.hostname.includes(LINKED_IN_DOMAIN)) {
      const jobDetails = document.querySelector(LINKED_IN_ELEMENT_SELECTOR_TO_INJECT_BUTTON);
      if (!jobDetails) {
        console.warn('[PageLoadingStateChecker] LinkedIn job details not found.');
        return false;
      }
    }

    if (location.hostname.includes('welcometothejungle.com')) {
      const jobDetails = document.querySelector(WTTJ_JOB_DETAILS_SELECTOR);
      if (!jobDetails) {
        console.warn('[PageLoadingStateChecker] Welcome to the Jungle job details not found.');
        return false;
      }
    }

    return true;
  }
}