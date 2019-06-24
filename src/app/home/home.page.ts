import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/carrinho.services';
import { Router } from '@angular/router';
import { Produto } from '../model/produto';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Categoria } from '../model/categoria';
import { Carrinho } from '../model/carrinho';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [CarService]
})
export class HomePage implements OnInit {

  
  categoriaList: Categoria[];

  items = [];
  
  cart = [];

  sliderConfig = {

    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 1.6
  }
  loading: any;

  produtos: Produto[];

  carregando = true;

  constructor(public router: Router,private database: DBService,public modalController: ModalController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, private carService: CarService) { 
      this.init();
  }


  private async init() {

    this.cart = this.carService.getCart();
    
    this.carregando = true;   
    await this.carregarProdutos();
    this.loadCategoria();
  }

  private async loadCategoria() {
    this.categoriaList = await this.database.listWithUIDs<Categoria>('/categorias');
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


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor,aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  novo() {
    this.router.navigate(['/cadastroProduto'])
  }

  abrirCarrinho(){
    this.router.navigate(['/carrinho']);
  }

    async addCart(produto) {
      this.carService.addProduto(produto)
      console.log(" carrinho:" , this.cart)
  }

 
  ngOnInit() {
  }

}
