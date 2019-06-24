import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { DBService } from '../services/db.services';



@Injectable({
  providedIn: 'root'
  
})


export class LoggedGuard implements CanActivate {
  constructor(
    private database: DBService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.database.getAuth().onAuthStateChanged(user => {
        if (user) this.router.navigate(['home']);

        resolve(!user ? true : false);
      });
    });
  }
}
