export enum units {
  YEAR = "year",
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
  HOUR = "hour",
  MINUTE = "minute",
  SECOND = "second",
  MILISECOND = "millisecond",
}

export interface TimeAdapter {
  addTimes(amount: number, unit: units): Date;
}
