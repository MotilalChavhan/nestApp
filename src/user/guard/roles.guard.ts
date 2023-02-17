import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtGuard } from 'src/auth/guard';
import { Role } from '../enums';

@Injectable()
export class RolesGuard extends JwtGuard {
    constructor(private reflector: Reflector) {
        super();
    }

    async canActivate(context: ExecutionContext) {
        await super.canActivate(context);

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        
        return user.role?.includes(requiredRoles);
    }
}
