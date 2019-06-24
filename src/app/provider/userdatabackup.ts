/*import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import * as firebase from 'firebase';
import { Carrinho } from '../model/carrinho';
import { DBService } from '../services/db.services';


@Injectable()
export class UserData {

    
  cartList :Carrinho;

  constructor(
    public events: Events,
    public storage: Storage,private database: DBService
  ) {

  }

  
  async addCart() {
    this.database.inserir('cart', this.cartList)
      .then(() => {
        this.cartList = new Carrinho()
      });
  }

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
