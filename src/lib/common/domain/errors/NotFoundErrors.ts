import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  constructor(statusCode: number, message?: string) {
    super(statusCode, message ?? 'Resource not found');
  }
}
