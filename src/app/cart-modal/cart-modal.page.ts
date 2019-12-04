import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.services';
import { ModalController } from '@ionic/angular';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart : Produto[] = [];

  constructor(private cartService: CartService,private modalCtrl: ModalController ) { }

  ngOnInit() {

    this.cart = this.cartService.getCart();
  }

  diminuirItemCart(product){
    this.cartService.decrementarProduto(product);

  }

  aumentarItemCart(product){
    this.cartService.addProdutos(product);
    
  }

  removerItemCart(product){
    this.cartService.removeProduto(product);
  }

  getTotal(){
    return this.cart.reduce((i, j) => i + j.preco * j.amount, 0)
  }

  close(){
    this.modalCtrl.dismiss();
  }

  checkout(){
    
  }
}
