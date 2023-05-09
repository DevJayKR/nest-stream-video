import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtAuthGuard extends AuthGuard('at') {
  handleRequest<TUser = any>(err: any, user: any, info: any, context: ExecutionContext, status?: any): TUser {
    if (info) {
      const { message } = info;
      throw new UnauthorizedException(message);
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
