import { Injectable } from '@angular/core';
import { DBService } from './db.services';
import { BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CartService {

 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  
  constructor(private database: DBService) { }
 
  getProdutos() {
    return this.database;
  }
 
  getCart() {
    return this.cart;
  }

  getItemCount(){
    return this.cartItemCount;
  }
  
  addProdutos(product) {
    this.cart.push(product);

    let added = false;
    for(let p of this.cart){
        if(p.id === product.id){
            p.amount += 1;
            added = true;
            break;
        }
    }

    if(!added){
        this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value +1);

  }

  decrementarProduto(product){
      for(let [index, p] of this.cart.entries()){
          if(p.id === product.id){
              p.amount -= 1;
              if(p.amount == 0){
                  this.cart.splice(index, 1);
              }
          }
      }
      this.cartItemCount.next(this.cartItemCount.value -1);

  }


  removeProduto(product){
    this.cart.splice(product);
  }

  
}