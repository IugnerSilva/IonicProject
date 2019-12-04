import { Injectable } from '@angular/core';
import { DBService } from './db.services';
 
@Injectable({
  providedIn: 'root'
})
export class CarService {

 
  private cart = [];
 
  constructor(private database: DBService) { }
 
  getProdutos() {
    return this.database;
  }
 
  getCart() {
    return this.cart;
  }
 
  addProdutos(product) {
    this.cart.push(product);
    
  }

  removeProduto(product){
    this.cart.splice(product);
  }
}