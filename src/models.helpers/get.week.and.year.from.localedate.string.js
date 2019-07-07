// @flow

import moment from 'moment';

export default (date: string): { week: number, year: number } => {
  const format = 'DD/MM/YYYY';
  const d = moment(date, format).startOf('week');
  const week = d.week();
  const year = d.year();
  return {
    week,
    year,
  };
}
