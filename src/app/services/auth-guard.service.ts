import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.map(user => {
      if (user) return true;
      this.router.navigate(['/login'],{queryParams:{
        returnUrl: state.url
      }});
      return false;

    })

  }
}
