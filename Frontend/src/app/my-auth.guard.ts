import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { LoginService } from './shared/link.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = this.loginService.getUserRole();

    if (route.data['roles'].includes(userRole)) {
      return true; // User has the required role, allow access
    } else if (!userRole) {
      this.router.navigate(['']); // Navigate to sign-in page if userRole is undefined
      return false;
    } else {
      alert('Access Denied');
      this.router.navigate(['home']); //navigate to home if unauthorised url entry by other users
      return false;
    }
  }
}