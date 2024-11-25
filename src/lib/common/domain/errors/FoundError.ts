import { CustomError } from './CustomError';

export class FoundError extends CustomError {
  constructor(message?: string) {
    super(302, message ?? 'Record was found');
  }
}
