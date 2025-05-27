import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Rôles exigés sur la route (via @Roles)
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      console.log('[RolesGuard] Aucun rôle requis → accès autorisé');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('[RolesGuard] Utilisateur connecté :', user);
    console.log('[RolesGuard] Rôle reçu :', user?.role);
    console.log('[RolesGuard] Rôles autorisés :', requiredRoles);

    if (!user || !user.role || !requiredRoles.includes(user.role)) {
      console.warn('[RolesGuard] Accès interdit : rôle insuffisant');
      throw new ForbiddenException('Accès interdit : rôle insuffisant');
    }

    return true;
  }
}