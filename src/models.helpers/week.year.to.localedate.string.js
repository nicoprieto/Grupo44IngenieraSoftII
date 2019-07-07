// @flow

import moment from 'moment';

export default (week: string, year: string): string => {
  const format = 'DD/MM/YYYY';
  const d = moment().year(parseInt(year, 10)).week(parseInt(week, 10));
  return d.format(format);
}
