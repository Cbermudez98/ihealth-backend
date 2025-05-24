import { Injectable } from '@nestjs/common';
import { genSaltSync, compareSync, hashSync } from 'bcrypt';
import { IHashProvider } from '../../../lib/common/domain/services/IHash.service';

@Injectable()
export class HashProvider implements IHashProvider {
  private readonly _salt = genSaltSync(10);
  compare(str: string, hashed: string): boolean {
    return compareSync(str, hashed);
  }

  encrypt(str: string): string {
    return hashSync(str, this._salt);
  }
}
