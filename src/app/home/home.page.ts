import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/carrinho.services';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.services';
import { Produto } from '../model/produto';
import { Categoria } from '../model/categoria';
import { AngularFireAuth } from '@angular/Fire/auth';
import { AuthService } from '../services/auth.services';
import { AppComponent } from '../app.component';
import { Cliente } from '../model/cliente';
import { Pedidos } from '../model/pedidos';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selectedDateString: string = new Date().toISOString();
  minDate: string = new Date().toISOString();
  maxDate: string = new Date().toISOString();
  cart: Produto[];
  items = [];
  cpf: string;

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
  categorias: Categoria[];
  produtos: Produto[];

  produtos2: Produto[];
  clientes: Cliente[];
  pedidos: Pedidos[];
  pedidos2: Pedidos[];
  arr3 = [];
  array = [];
  uid: string;

  constructor(private router: Router, private cartService: CarService,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private database: DBService, private afa: AngularFireAuth, private auth: AuthService,
    private app: AppComponent, private plataform: Platform) {

    this.plataform.ready().then(() => {

      let date: Date = new Date();
      date.setDate(date.getDate() - 5);
      this.minDate = date.toISOString();

      date = new Date();
      date.setDate(date.getDate() + 5);
      this.maxDate = date.toISOString();
    })


  }
  async ngOnInit() {

    this.cart = this.cartService.getCart();
    this.loadCategoria();
    this.carregarUsuario();
    this.app.inicializarDadosLogin();
    this.listarPedidos();
    this.carregarCategorias();
    this.carregarProdutos();

    var user = this.afa.auth.currentUser;
    if (user != null) {
      this.administrador = await this.auth.isAdmin();
    }
  }

  ionViewWillEnter() {
    this.cart = this.cartService.getCart();
  }

  decrementarProduto(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.uid === product.uid) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
  }

  addToCart(product) {

    let added = false;
    let items = this.cart;
    for (let p of items) {
      if (p.uid === product.uid) {
        p.amount++;

        added = true;

        console.log(p.amount)
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
      product.amount = 1;

    }
  }

  openCart() {
    this.router.navigate(['carrinho']);
  }

  openPedidos() {
    this.router.navigate(['pedido-cliente']);
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  remove(uid: string) {
    this.database.remover('/produtos', uid)
      .then(() => {
        this.presentToast('Produto removido com sucesso !');
      });
  }

  async listarPedidos() {

    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        for (let cli of this.clientes) {

          this.uid = cli.uid;
          this.database.listar<Pedidos>('/pedidos/' + this.uid)
            .then(pedidos => {
              this.pedidos = pedidos;

              for (var i in this.pedidos) {
                var shared = false;
                for (var j in this.pedidos2)
                  if (this.pedidos2[j].nomeCli == this.pedidos[i].nomeCli) {
                    shared = true;
                    break;
                  }
                if (!shared) this.arr3.push(this.pedidos[i])


              }
            }).catch(error => {
              console.log(error);
            });

        }

      }).catch(error => {
        console.log(error);
      });

  }

  private async loadCategoria() {
    this.categoriaList = await this.database.listWithUIDs<Categoria>('/categorias');
  }

  private async carregarBebidas() {
    this.database.listar<Produto>('/produtos/22222')
      .then(bebidas => {
        this.bebidas = bebidas;
      }).catch(error => {
        console.log(error);
      });
  }
  private async carregarAlimentos() {
    this.database.listar<Produto>('/produtos/12345')
      .then(alimentos => {
        this.alimentos = alimentos;
      }).catch(error => {
        console.log(error);
      });
  }
  private async carregarLimpeza() {
    this.database.listar<Produto>('/produtos/789456')
      .then(limpeza => {
        this.limpeza = limpeza;
      }).catch(error => {
        console.log(error);
      });
  }

  carregarUsuario() {
    var user = this.afa.auth.currentUser;
    if (user != null) {

      this.cpf = user.uid
    }
  }

  private async carregarCategorias() {
    this.database.listar<Categoria>('/categorias')
      .then(categorias => {
        this.categorias = categorias;
      }).catch(error => {
        console.log(error);
      });
  }

  private carregarProdutos() {

    this.carregarAlimentos();
    this.carregarBebidas();
    this.carregarLimpeza();
  }
}