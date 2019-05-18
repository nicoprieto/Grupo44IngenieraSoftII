// @flow

import moment from 'moment';

export type TNow = () => string;

export default (): string => {
  return moment().format('YYYY-DD-MM HH:mm:ss');
}
