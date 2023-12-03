import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JWT_SECRET } from 'src/constant';
import { Roles } from './role.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const roles = this.reflector.get(Roles, context.getHandler());
      if (!roles) return true;
      const request = context.switchToHttp().getRequest();
      const authorizationHeader = request.headers.authorization;
      const accessToken = authorizationHeader.split(' ')[1];
      const payload = this.jwtService.verify(accessToken, {
        secret: JWT_SECRET,
      });
      const checkRole = roles.includes(payload.role);
      if (!checkRole) throw new UnauthorizedException();
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
