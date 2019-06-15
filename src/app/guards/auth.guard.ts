import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DBService } from '../services/db.services';


@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {

  constructor(
    public router: Router, private database: DBService
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.database.getAuth().onAuthStateChanged(user => {
        if (!user) this.router.navigate(['login']);

        resolve(user ? true : false);
      });
    });
  }
}
