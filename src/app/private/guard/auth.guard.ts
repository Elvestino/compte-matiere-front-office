import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLogged()) {
    return true;
  } else {
    inject(Router).navigate(['']);
    return false;
  }
};
