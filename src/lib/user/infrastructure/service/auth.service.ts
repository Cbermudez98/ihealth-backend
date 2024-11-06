import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {}

export async function hashPassword(
  password: string,
  saltRounds = 10,
): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}
