import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const publicAuthGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLogged()) {
    inject(Router).navigate(['apps']);
    return false;
  } else {
    return true;
  }
};
