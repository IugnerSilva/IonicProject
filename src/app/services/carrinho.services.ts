import { Injectable } from '@angular/core';
import { DBService } from './db.services';
 
@Injectable({
  providedIn: 'root'
})
export class CarService {

 
   cart = [];
  selectedItems: any[];
 
  constructor(private database: DBService) { 
  }
 
  getProdutos() {
    return this.database;
  }
 
  getCart() {
    return this.cart;
  }
 
  addProdutos(product) {
    this.cart.push(product);
    this.cart = this.getCart();
    let items = this.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.uid]) {
        selected[obj.uid].amount++;
      } else {
        selected[obj.uid] = {...obj, amount:1};
        
    console.log("entrou aqui");
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key])
    
  }

  removeProduto(product){
    this.cart.splice(product);
  }
  
}