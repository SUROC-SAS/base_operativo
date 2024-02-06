export enum units {
  DAY = 'day',
  HOUR = 'hour',
  WEEK = 'week',
  YEAR = 'year',
  MONTH = 'month',
  MINUTE = 'minute',
  SECOND = 'second',
  MILISECOND = 'millisecond',
}

export interface TimeAdapter {
  addTimes(amount: number, unit: units): Date;
}
