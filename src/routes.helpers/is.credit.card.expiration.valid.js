// @flow

import moment from 'moment';

export default (mmyy: string): bool => {
  const arr = mmyy.split('/');
  if(arr.length !== 2) {
    return false;
  }
  const [ mm, yy ] = arr;
  const d = moment(`01-${mm}-${yy}`, 'DD-MM-YY');
  if(!d.isValid()) {
    return false;
  }
  const diff = moment().diff(d);
  // if diff is negative it means that mmyy is greater than today
  return diff < 0 ? true : false;
};
