import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.services';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Produto } from '../model/produto';
import { DBService } from '../services/db.services';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {
  cart = [];
  produtos = [];
  cartItemCount: BehaviorSubject<number>;


  constructor(private cartService : CartService, private modalCtrl: ModalController, private database: DBService) { }

  async ngOnInit() {
    //this.produtos = this.cartService.getProdutos();
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getItemCount();
    
    await this.carregarProdutos();
  }
  private async carregarProdutos() {
   // await this.presentLoading();
    this.database.listar<Produto>('/produtos')
      .then(produtos => {
        this.produtos = produtos;
        //this.carregando = false;
       // this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  addToCart(p){
    this.cartService.addProdutos(p);
  }

  async openCart(){
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    })

    modal.present();
  }

}
