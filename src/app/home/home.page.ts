import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/carrinho.services';
import { LoadingController, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.services';
import { Produto } from '../model/produto';
import { Categoria } from '../model/categoria';
import { CarrinhoPage } from '../carrinho/carrinho.page';
import { AngularFireAuth } from '@angular/Fire/auth';
import { AuthService } from '../services/auth.services';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cart: Produto[];
  items = [];
  cpf:string;

  sliderConfig = {
    spaceBetween: 0,
    slidesPerView: 1.0,
    centeredSlides: true
  };

  loading: any;

  bebidas: Produto[];
  alimentos: Produto[];
  limpeza: Produto[];

  selectedItems = [];
  categoriaList: Categoria[];
  
  administrador: boolean;

  carregando = true;
  LoginPage: any;

  constructor(private router: Router, private cartService: CarService,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private database: DBService,private afa:AngularFireAuth,private auth:AuthService,
    private app: AppComponent) { 

      
    }

  async ngOnInit() {
    this.cart = this.cartService.getCart();
    this.carregando = true;
    
    await this.carregarBebidas();
    await this.carregarAlimentos();
    await this.carregarLimpeza();
    this.loadCategoria();
    this.carregarUsuario();
    this.app.inicializarDadosLogin();
  }

  decrementarProduto(product) {
    for(let [index,p] of this.cart.entries()){
      if(p.uid===product.uid){
        p.amount-=1;
        if(p.amount==0){
          this.cart.splice(index,1);
        }
      }
    }
  }

  addToCart(product) {
    
    let added =false;
    let items = this.cart;
    for(let p of items){
      if(p.uid === product.uid){
        p.amount++;

        added = true;
        
      console.log(p.amount)
        break;
      }
    }
    if(!added){
      this.cart.push(product);
      product.amount = 1;
      
      console.log("cadastrou") 
    }
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

  remove(uid: string) {
    this.database.remover('/produtos', uid)
      .then(() => {
        this.presentToast('Produto removido com sucesso !');
        //this.carregarProdutos();
      });
  }

  private async loadCategoria() {
    this.categoriaList = await this.database.listWithUIDs<Categoria>('/categorias');
  }

  private async carregarBebidas() {
    await this.presentLoading();
    this.database.listar<Produto>('/produtos/bebidas')
      .then(bebidas => {
        this.bebidas = bebidas;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }
  private async carregarAlimentos() {
    this.database.listar<Produto>('/produtos/alimentos')
      .then(alimentos => {
        this.alimentos = alimentos;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }
  private async carregarLimpeza() {
    this.database.listar<Produto>('/produtos/limpeza')
      .then(limpeza => {
        this.limpeza = limpeza;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  carregarUsuario(){
    var user = this.afa.auth.currentUser;
      if (user != null) {
     
      this.cpf = user.uid
    console.log('id usuario'+this.cpf)}
  }

}