import { Injectable } from '@nestjs/common';

@Injectable()
export class IauthService {
  login: (id: any) => Promise<{ access_token: string }>;
  validateUser: (username: string) => Promise<any>;
}
