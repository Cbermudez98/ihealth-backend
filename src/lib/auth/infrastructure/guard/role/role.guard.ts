import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from './../../../../../common/constants/roles.enum';
import { ForbiddenError } from './../../../../common/domain/errors/ForbiddenError';
import { ROLES_KEY } from './../../../../role/infrastructure/decorator/role.decorator';
import { ITokenPayload } from '../../interfaces/IToken';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<ROLES[]>(ROLES_KEY, context.getHandler());
    if (!roles)
      throw new ForbiddenError('User does not have the required role');

    const request = context.switchToHttp().getRequest();
    const user: ITokenPayload = request.user;

    if (!user) {
      throw new ForbiddenError('User is not authenticated');
    }

    const hasRole = roles.find((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenError('User does not have the required role');
    }
    return true;
  }
}
