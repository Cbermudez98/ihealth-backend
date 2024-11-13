import { CustomError } from './CustomError';

export class ForbiddenError extends CustomError {
  constructor(message?: string) {
    super(403, message ?? 'Credentials not valid');
  }
}
