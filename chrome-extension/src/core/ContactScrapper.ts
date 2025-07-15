import { findPhoneNumbersInText, type NumberFound } from 'libphonenumber-js';

const EMAIL_REGEX: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

/**
 * Extracts contacts (emails and phone numbers) from a job description.
 * @param text The job description text.
 * @returns An array of unique contact strings (emails and phone numbers).
 */
export function getContactsFromText(text: string): string[] {
  const contacts = new Set<string>();

  const emails = text.match(EMAIL_REGEX);
  if (emails) {
    emails.forEach(email => contacts.add(email));
  }

  findPhoneNumbersInText(text).forEach((phone: NumberFound) => {
    if (phone.number) {
      contacts.add(phone.number.formatInternational());
    }
  });

  return Array.from(contacts);
}