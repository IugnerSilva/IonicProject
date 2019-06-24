/*import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import * as firebase from 'firebase';
import { DBService } from '../services/db.services';

@Injectable()
export class UserData {
  HAS_LOGGED_IN = 'hasLoggedIn';
  public fireAuth: any;
  inputValue: any;
  uid: any;
  names: any;

  constructor(
    public events: Events,
    public storage: Storage,private database: DBService
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


}*/
