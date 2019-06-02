// @flow

export default (date?: string): string => {
  if(typeof date === 'undefined') {
    return '';
  }
  if(date === '') {
    return '';
  }
  // date has format YYYY-MM-DD HH:mm:ss
  const arr = date.split(' ');
  if(arr.length !== 2) {
    return '';
  }
  const arr2 = arr[0].split('-');
  if(arr2.length !== 3) {
    return '';
  }
  return `${arr2[2]}/${arr2[1]}/${arr2[0]}`;
}
