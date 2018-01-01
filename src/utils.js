// @flow

export function downloadData(fileName: string, text: string): void {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', fileName);
  element.style.display = 'none';

  // $FlowFixMe
  document.body.appendChild(element);

  element.click();

  // $FlowFixMe
  document.body.removeChild(element);
}

export function getDate(date: string, time?: string): Date {
  let hour = 0;
  let minute = 0;
  let second = 0;

  if (time) {
    const pieces = time.split(':');

    hour = parseInt(pieces[0], 10);
    minute = parseInt(pieces[1], 10);
  }

  const pieces = date.split('-');
  const year = parseInt(pieces[0], 10);
  const month = parseInt(pieces[1], 10) - 1;
  const day = parseInt(pieces[2], 10);

  return new Date(year, month, day, hour, minute, second);
}

export function getDateString(date: Date): string {
  let year = date.getFullYear();

  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
}

export function getTimeString(date: Date): string {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
