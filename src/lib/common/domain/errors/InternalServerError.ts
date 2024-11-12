import { CustomError } from './CustomError';

export class InternalServerError extends CustomError {
  constructor(message?: string) {
    super(500, message ?? 'Internal server error');
  }
}
