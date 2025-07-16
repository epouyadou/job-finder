
export function getDateFromPostedDateText(postedDateText: string): Date | undefined {
  console.log('[Job Extension] Parsing posted date:', postedDateText);
  const lowerText = postedDateText.toLowerCase().trim();

  const minuteMatch = lowerText.match(/(\d+)\s*(minute|min)/);
  if (minuteMatch) {
    console.log('[Job Extension] Posted date is less than an hour old');
    return new Date();
  }

  const hourMatch = lowerText.match(/(\d+)\s*(heure|hour)/);
  if (hourMatch) {
    console.log('[Job Extension] Posted date is less than a day old');
    return new Date();
  }

  const dayMatch = lowerText.match(/(\d+)\s*(jour|day)/);
  if (dayMatch) {
    console.log('[Job Extension] Posted date is less than a week old');
    const value = parseInt(dayMatch[1], 10);
    const now = new Date();
    now.setDate(now.getDate() - value);
    return now;
  }

  const weekMatch = lowerText.match(/(\d+)\s*(semaine|week)/);
  if (weekMatch) {
    console.log('[Job Extension] Posted date is less than a month old');
    const value = parseInt(weekMatch[1], 10);
    const now = new Date();
    now.setDate(now.getDate() - value * 7);
    return now;
  }

  const monthMatch = lowerText.match(/(\d+)\s*(mois|month)/);
  if (monthMatch) {
    console.log('[Job Extension] Posted date is less than a year old');
    const value = parseInt(monthMatch[1], 10);
    const now = new Date();
    now.setMonth(now.getMonth() - value);
    return now;
  }

  if (lowerText === 'aujourd\u2019hui' || lowerText === 'today') {
    console.log('[Job Extension] Posted date is today');
    return new Date();
  }

  return undefined;
}