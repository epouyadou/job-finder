import { PageLoadingStateChecker } from './checkers/PageLoadingStateChecker';
import { LINKED_IN_ELEMENT_SELECTOR_TO_INJECT_BUTTON } from './constants/Linkedin.constant';
import { WTTJ_ELEMENT_SELECTOR_TO_INJECT_BUTTON } from './constants/WttJ.constant';
import { Website } from './core/Website';
import { ApplyJobButton } from './injected-code/ApplyJobButton';

function addButtonOnLinkedInJobPage() {
  const element = document.querySelector(LINKED_IN_ELEMENT_SELECTOR_TO_INJECT_BUTTON);
  console.log('LinkedIn job element found:', element);
  console.log('LinkedIn job element parent:', element?.parentElement);
  if (element && element.parentElement) {
    console.log('Injecting Apply Job button into LinkedIn job page');
    ApplyJobButton.attachToJobElement(element.parentElement);
  } else {
    console.warn('LinkedIn job element not found for button injection');
  }
}

function addButtonOnWttJJobPage() {
  const element = document.querySelector(WTTJ_ELEMENT_SELECTOR_TO_INJECT_BUTTON);
  if (element && element.parentElement) {
    console.log('Injecting Apply Job button into Welcome to the Jungle job page');
    ApplyJobButton.attachToJobElement(element.parentElement);
  } else {
    console.warn('Welcome to the Jungle job element not found for button injection');
  }
}

const observer = new MutationObserver((_, obs) => {
  const isLoaded: boolean = PageLoadingStateChecker.isPageLoaded();

  if (isLoaded) {
    obs.disconnect();

    if (Website.isLinkedIn()) {
      addButtonOnLinkedInJobPage();
    } else if (Website.isWttJ()) {
      addButtonOnWttJJobPage();
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

