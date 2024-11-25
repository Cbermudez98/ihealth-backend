import { isAfter, isBefore, isEqual, parseISO } from 'date-fns';

export class DateUtil {
  static getStartDate(date: string) {
    return new Date(
      Date.UTC(
        parseInt(date.substring(0, 4)), // year
        parseInt(date.substring(5, 7)) - 1, // month (0-based)
        parseInt(date.substring(8, 10)), // day
        0,
        0,
        0,
        0,
      ),
    );
  }

  static getEndDate(date: string) {
    return new Date(
      Date.UTC(
        parseInt(date.substring(0, 4)), // year
        parseInt(date.substring(5, 7)) - 1, // month (0-based)
        parseInt(date.substring(8, 10)), // day
        23,
        59,
        59,
        999,
      ),
    );
  }

  static parseToUTC(dateString: string): Date {
    const date = new Date(dateString);
    return date;
  }

  static isDateTodayOrFuture(date: Date) {
    const dateGiven = new Date(
      `${date.getFullYear()}-${date.getMonth()}-${date.getUTCDate()}`,
    );

    return dateGiven >= this.getCurrentDate();
  }

  static getCurrentDate(): Date {
    const date = new Date();
    return new Date(
      `${date.getFullYear()}-${date.getMonth()}-${date.getDate() - 1}`,
    );
  }

  static getHour(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    // const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:00`;
  }
}
