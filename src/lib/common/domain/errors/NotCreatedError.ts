import { CustomError } from './CustomError';

export class NotCreatedError extends CustomError {
  constructor(message?: string) {
    super(422, message ?? 'Error creating resource');
  }
}
