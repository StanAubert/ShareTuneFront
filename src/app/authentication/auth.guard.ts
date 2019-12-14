import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { AuthServiceInterface } from './auth.interface';
import { Inject, Injectable } from '@angular/core';
import { AUTH_SERVICE } from './auth.injection';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(@Inject(AUTH_SERVICE) private auth: AuthServiceInterface, private router: Router) { }


  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.auth.isAuthenticated()) {
      return true;
    }


    this.router.navigateByUrl("/login");
    return false;
  }

}
