// @flow

export default (date?: string, time: string = '00:00:00'): string => {
  // date has this format dd/mm/yyyy
  if(typeof date === 'undefined') {
    return '';
  }
  if(date === '') {
    return '';
  }
  const arr = date.split('/');
  if(arr.length !== 3) {
    return '';
  }
  return `${arr[2]}-${arr[1]}-${arr[0]} ${time}`
}
