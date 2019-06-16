// @flow

import moment from 'moment';

export default (birth_date: string): bool => {
  const years = moment().diff(moment(birth_date, 'DD/MM/YYYY'), 'years');
  console.log('--------------------------');
  console.log(years);
  return years >= 18;
};
