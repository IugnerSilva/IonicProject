import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { Router } from '@angular/router';
import { DBService } from './db.services';
import { Carrinho } from '../model/carrinho';
@Injectable()

export class CarService {

     cart = [];
    
    cartList :Carrinho;
    
    produtos: Produto[];

    constructor(private router: Router, 
        private database: DBService){}

        private data = [{ category: 'Pizza',
            expanded: true,
            products: [
              { id: 0, name: 'Salami', price: '8' },
              { id: 1, name: 'Classic', price: '5' },
              { id: 2, name: 'Tuna', price: '9' },
              { id: 3, name: 'Hawai', price: '7' }
            ]
          },
          {
            category: 'Pasta',
            products: [
              { id: 4, name: 'Mac & Cheese', price: '8' },
              { id: 5, name: 'Bolognese', price: '6' }
            ]
          },
          {
            category: 'Salad',
            products: [
              { id: 6, name: 'Ham & Egg', price: '8' },
              { id: 7, name: 'Basic', price: '5' },
              { id: 8, name: 'Ceaser', price: '9' }
            ]
          }
        ];

        
    

    getProdutos(){
        
        return this.database;
    }
    
    getCart(){
        return this.cart;
    }

    addProduto(produto){
        this.cart.push(produto);
    }
}