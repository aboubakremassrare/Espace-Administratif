import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  IsAdmin:string='1';
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkRole(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkRole(url: string) {
    if(localStorage.getItem('isadmin')==this.IsAdmin){
          return true
     }

    this.authService.redirectUrl = url;
  }
    
}
