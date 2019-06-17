// @flow

import moment from 'moment';

export default (birth_date: string): bool => {
  const years = moment().diff(moment(birth_date, 'DD/MM/YYYY'), 'years');
  return years >= 18;
};
