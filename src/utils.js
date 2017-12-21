export function getDate(date: string, time?: string): Date {
  let hour = '00';
  let minute = '00';
  let second = '00';

  if (time) {
    const pieces = time.split(':');

    hour = pieces[0];
    minute = pieces[1];
  }

  const pieces = date.split('-');
  const year = pieces[0];
  const month = pieces[1] - 1;
  const day = pieces[2];

  return new Date(year, month, day, hour, minute, second);
}

export function getDateString(date: Date): string {
  let year = date.getUTCFullYear();

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
