import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanMatch, CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuth().pipe(
      tap((isAuthenticated) => console.log('isAuth:', isAuthenticated)),
      tap((isAuthenticated) => {
        if (!isAuthenticated) this.router.navigateByUrl('/auth/login');
      }),
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ): boolean | Observable<boolean> {
    // console.log({ route, segments });

    return this.checkAuthStatus();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot // foto de como esta el router
  ): boolean | Observable<boolean> {
    // console.log({ route, state });

    return this.checkAuthStatus();
  }
}
