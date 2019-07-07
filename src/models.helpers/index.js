// @flow

import password, { type TPassword } from './password';
import now from './now';
import moment from './moment';
import localedateToDatetimeString from './localedate.to.datetime.string';
import datetimeToDatetimeString from './datetime.to.localedate.string';
import weekYearToLocaledateString from './week.year.to.localedate.string';
import getWeekAndYearFromLocaledateString from './get.week.and.year.from.localedate.string';

export type THelpers = {
  password: TPassword,
  now: typeof now,
  moment: typeof moment,
  localedateToDatetimeString: typeof localedateToDatetimeString,
  datetimeToDatetimeString: typeof datetimeToDatetimeString,
  weekYearToLocaledateString: typeof weekYearToLocaledateString,
  getWeekAndYearFromLocaledateString: typeof getWeekAndYearFromLocaledateString,
};

export default {
  password,
  now,
  moment,
  localedateToDatetimeString,
  datetimeToDatetimeString,
  weekYearToLocaledateString,
  getWeekAndYearFromLocaledateString,
};
