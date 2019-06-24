/*import { Injectable } from '@angular/core';

import { Events, NavController } from 'ionic-angular';
//import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import firebase from 'firebase';
import { AngularFire, FirebaseListObservable  } from 'angularfire2';

@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  public fireAuth: any;
  inputValue: any;
  theItems: FirebaseListObservable<any[]>;;
  uid: any;
  names: any;

  constructor(
    public events: Events,
    public storage: Storage,
    public af: AngularFire,
  ) {
    this.fireAuth = firebase.auth();
  }

  addToCart(uid: string, item: any): void {
    let obj = this.af.database.object(`/carts/${uid}/${item.name}`);
    obj.$ref.transaction(val => {
      if(val == null){
        return { name: item.name, cost: item.cost, url: item.url, count: 1};
      }
      else{
        return { name: item.name, cost: item.cost, url: item.url, count: val.count + 1};
      }
    });
  };

  removeFromCart(uid: string, item: any): void {
    let obj = this.af.database.object(`/carts/${uid}/${item.name}`);
    obj.$ref.transaction(val => {
      if(val.count > 1){
        return { name: item.name, cost: item.cost, url: item.url, count: val.count - 1};
      }
      else{
        return null;
      }
    });
  };

  getItemsFromCart(): any {
    this.getUid().then((uid) => {
      return this.af.database.list('/carts' + '/' + uid);
    });
  };

  getUid(): Promise<string> {
    return this.storage.get('UID').then((value) => {
      return value;
    });
  };


}
*/