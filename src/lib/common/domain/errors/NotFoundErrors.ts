import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  constructor(message?: string) {
    super(400, message ?? 'Resource not found');
  }
}
