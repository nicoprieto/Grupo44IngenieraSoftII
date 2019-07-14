// @flow

import getWeekAndYearFromLocaledateString from './get.week.and.year.from.localedate.string';

export default (
  startDateInLocaledateFormat: string,
  endDateInLocaledateFormat: string
): Array<number> => {

  const start = getWeekAndYearFromLocaledateString(startDateInLocaledateFormat);
  const end = getWeekAndYearFromLocaledateString(endDateInLocaledateFormat);
  const weeksRange = start.week <= end.week ?
    Array(52)
    .fill('?')
    .map((_, i) => i)
    .filter((_, i) => i >= start.week && i <= end.week)
    :
  // esta buscando finales de este anio y comienzo del anio siguiente
    Array(52)
    .fill('?')
    .map((_, i) => i)
    .filter((_, i) => i >= start.week)
    .concat(
      Array(52)
      .fill('?')
      .map((_, i) => i)
      .filter((_, i) => i <= end.week)
    )
  ;

  return weeksRange;
};
