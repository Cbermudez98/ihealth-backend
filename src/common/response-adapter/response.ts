import { HttpStatus } from '@nestjs/common';

export class ResponseAdapter {
  static set<T>(
    code: HttpStatus,
    data: T,
    message: string,
    status: boolean = false,
  ) {
    return {
      code,
      data,
      message,
      status,
      timestamp: new Date().toISOString(),
    };
  }
}
