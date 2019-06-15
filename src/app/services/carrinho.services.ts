import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { Router } from '@angular/router';
import { DBService } from './db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';

@Injectable()

export class CarService {
    private data = [{
        categoria: "cereais",
        expanded:true,
        produtos:[
            
            {id:0, nome:'feijao', preco:'5.60'},
            {id:1, nome:'cuzcuz', preco:'1.60'},
            {id:2, nome:'arroz', preco:'2.60'},
        ]
    },{
        categoria: "bolacha",
        produtos:[

            {id:3, nome:'vitarela', preco:'3.20'},
            {id:4, nome:'pilar', preco:'2.60'},
            {id:5, nome:'maizena', preco:'3.20'},

        ]
    }]

    private cart = [];

    constructor() {
    }


    getProdutos(){
        return this.data;
    }
    
    getCart() {
        return this.cart;
    }

    addProduto(produto) {
        this.cart.push(produto);
    }
}