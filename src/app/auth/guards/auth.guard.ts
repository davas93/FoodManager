import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {AuthService} from "../../core/services/auth.service";

export const authGuardFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated.pipe(
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      } else {
        router.navigate(['/auth']);
        return false;
      }
    })
  );
};

export const authGuardDeactivate = (): Observable<boolean> => {
  const authService = inject(AuthService);

  return authService.isAuthenticated.pipe(
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        return false;
      }
    })
  );
};
