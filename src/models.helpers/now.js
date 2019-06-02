// @flow

import moment from 'moment';

export default (): string => {
  return moment().format('YYYY-DD-MM HH:mm:ss');
}
