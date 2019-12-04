import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/carrinho.services';
import { LoadingController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.services';
import { Produto } from '../model/produto';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cart = [];
  items = [];

  sliderConfig = {
    spaceBetween:10,
    slidesPerView: 1.6,
    centeredSlides: true
  };

  loading: any;

  produtos: Produto[];

  selectedItems = [];
  categoriaList: Categoria[];

  carregando = true;

  constructor(private router: Router, private cartService: CarService,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private database: DBService) { }

  async ngOnInit() {
    this.cart = this.cartService.getCart();
    this.carregando = true;
    await this.carregarProdutos();
    this.loadCategoria();

  }

  async quant() {
    let items = this.cartService.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.uid]) {
        selected[obj.uid].quantidade++;
      } else {
        selected[obj.uid] = { ...obj, quantidade: 1 };
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key])

  }

  removeItem() {
    let items = this.cartService.getCart();
    let selected = {};
    for (let obj of items) {
      if (selected[obj.uid]) {
        selected[obj.uid].quantidade--;
        
    this.cart = this.cartService.getCart();
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected[key])

  }

  addToCart(product) {
    this.cartService.addProdutos(product);
    this.quant();
  }

  removeToCart(product) {

    this.cartService.removeProduto(product);

  }

  openCart() {
    this.router.navigate(['carrinho']);
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor,aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  private async carregarProdutos() {
    await this.presentLoading();
    this.database.listar<Produto>('/produtos')
      .then(produtos => {
        this.produtos = produtos;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  remove(uid: string) {
    this.database.remover('/produtos', uid)
      .then(() => {
        this.presentToast('Produto removido com sucesso !');
        this.carregarProdutos();
      });
  }

  private async loadCategoria() {
    this.categoriaList = await this.database.listWithUIDs<Categoria>('/categorias');
  }
}