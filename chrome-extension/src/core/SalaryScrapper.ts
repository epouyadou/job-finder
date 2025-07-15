//const SALARY_REGEX: RegExp = /(?:(?:remuneration|salaire|salary)(?:\s*:?\s*))?((?:\d+(?:,)?)+(?:K|M)?)(?:\s*(?:-|à)\s*((?:\d+(?:,)?)+(?:K|M)?))?\s*(€|\$|£|¥)?/gi;

const CURRENCY_SYMBOLS: string[] = [
  '€',
  '$',
  '£',
  '¥',
];

const SALARY_RANGE_SEPARATORS: string[] = [
  '-', 'à', 'to', 
];

const SALARY_WORDS: string[] = [
  'remuneration', 
  'salaire', 
  'salary', 
  'compensation', 
  'earnings', 
  'pay',
  'wage', 
  'income', 
  'stipend', 
  'fee', 
  'rate',
];

const SALARY_NUMBER_SUFFIXES: string[] = [
  'k', 'm'
];

const SALARY_NUMBER_REGEX: string = `((?:\d+(?:,\d{3})*(?:.\d+)?)(?: )?(?:${SALARY_NUMBER_SUFFIXES.join('|')})?)`;

const SALARY_REGEX: RegExp = new RegExp(
  `(?:(?:${SALARY_WORDS.join('|')})(?:\s*:?\s*))?` +
  `(${CURRENCY_SYMBOLS.join('|')})?` + 
  `${SALARY_NUMBER_REGEX}` +
  `(?:` +
    `\s*` +
    `(?:${SALARY_RANGE_SEPARATORS.join('|')})` +
    `\s*` +
    `${SALARY_NUMBER_REGEX}` +
  `)?` +
  `\s*` +
  `(${CURRENCY_SYMBOLS.join('|')})?`
  , 'gi');


/**
 * Extracts the salary information from a job description.
 * @param text The job description text.
 * @returns The extracted salary information or undefined if not found.
 */
export function getSalaryFromText(text: string): string | undefined {
  const match = SALARY_REGEX.exec(text);
  
  // If there is no match, return there is no salary information.
  // If there is less than 2 matches, it could possibly mean that we only found a single number without a range or currency.
  if (!match || match.length < 2) {
    return undefined;
  }

  if (CURRENCY_SYMBOLS.includes(match[1])) {
    // For cases where the salary starts with a currency symbol
    return formatSalary(match[2], match[3], match[1]);
  } else if (CURRENCY_SYMBOLS.includes(match[2])) {
    // For cases where there is no max salary but a currency symbol
    return formatSalary(match[1], undefined, match[2]);
  }
  
  // For every other case. The formating function will handle the rest if there is
  // no max salary or currency symbol.
  return formatSalary(match[1], match[2], match[3]);
}

function formatSalary(minSalary: string, maxSalary?: string, currency?: string): string {
  let formattedSalary = minSalary;

  if (maxSalary) {
    formattedSalary += ` - ${maxSalary}`;
  }

  if (currency) {
    formattedSalary += ` ${currency}`;
  }

  return formattedSalary.trim();
}
