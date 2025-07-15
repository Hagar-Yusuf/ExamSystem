import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const expectedRole = route.data['role'];

  if (!auth.isLoggedIn()) {
    return router.parseUrl('/login');
  }

  if (expectedRole && auth.getRole() !== expectedRole) {
    return router.parseUrl('/login');
  }

  return true;
};


