// @flow

import getWeekAndYearFromLocaledateString from './get.week.and.year.from.localedate.string';

export default (
  startDateInLocaledateFormat: string,
  endDateInLocaledateFormat: string
): Array<number> => {

  const start = getWeekAndYearFromLocaledateString(startDateInLocaledateFormat);
  const end = getWeekAndYearFromLocaledateString(endDateInLocaledateFormat);
  
  return [ start.year, end.year ];
};
