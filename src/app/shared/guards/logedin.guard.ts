import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../shared/services/user.service'

@Injectable()
export class LogedinGuard implements CanActivate {

  constructor(
    private userService: UserService,
    public router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if( this.userService.isNotAuthenticated() ){
      this.router.navigate(['/signin'])
      return false;
    }
    return true;
  }
}
