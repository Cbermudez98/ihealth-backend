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
    // Parse the string into a Date object
    const date = new Date(dateString);

    // Return the time in UTC format (milliseconds since Jan 1, 1970)
    return date; // This is the UTC timestamp (in milliseconds)
  }
}
