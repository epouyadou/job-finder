import { LINKED_IN_DOMAIN } from '../constants/Linkedin.constant';
import { WTTJ_DOMAIN } from '../constants/WttJ.constant';

export class Website {
  static isLinkedIn(): boolean {
    return location.hostname.includes(LINKED_IN_DOMAIN);
  }

  static isWttJ(): boolean {
    return location.hostname.includes(WTTJ_DOMAIN);
  }
}