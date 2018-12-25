import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      const currentURL = '/'+next.url.toString();
      console.log("CURRENT URL: "+currentURL);
    //const currentComponentName = next.routeConfig.component.name.toString();
    this.accountService.authorize(currentURL);
    console.log('canActivate fisnished');
    return true;
  }
}
