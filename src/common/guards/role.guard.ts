import { CanActivate, ExecutionContext, Type, mixin } from '@nestjs/common';
import { AtAuthGuard } from 'src/auth/guards/at.auth.guard';
import { Roles } from 'src/user/entities/roles.enum';

export const RoleGuard = (role: Roles): Type<CanActivate> => {
  class RoleGuardMixin extends AtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest();
      const user = request.user;

      return user?.roles.includes(role);
    }
  }
  return mixin(RoleGuardMixin);
};
