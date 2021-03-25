import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../services/carrinho.services';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import { DBService } from '../services/db.services';
import { Produto } from '../model/produto';
import { Categoria } from '../model/categoria';
import { AngularFireAuth } from '@angular/Fire/auth';
import { AuthService } from '../services/auth.services';
import { AppComponent } from '../app.component';
import { Cliente } from '../model/cliente';
import { Pedidos } from '../model/pedidos';
import { DetalhesPage } from '../detalhes/detalhes.page';

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
  quantPedidos = [];
  arr4 = [];
  array = [];
  uid: string;
  uid2: string;
  clientes2: Cliente[];

  constructor(private router: Router, private cartService: CarService,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private database: DBService, private afa: AngularFireAuth, public modal: ModalController,
    private auth: AuthService, private app: AppComponent, private plataform: Platform) {

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

  async sair() {
    this.afa.auth.signOut();
    this.router.navigate(['/login'])
    .then(nav => {
          window.location.reload();
    })
      }

  ionViewWillEnter() {
    this.cart = this.cartService.getCart();
  }

  decrementarProduto(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.uid === product.uid) {
        p.quantidade -= 1;
        if (p.quantidade == 0) {
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
        p.quantidade++;

        added = true;

        console.log(p.quantidade)
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
      product.quantidade = 1;

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
                if (!shared) this.arr4.push(this.pedidos[i])

              }

              for (let pedido of this.pedidos) {
                if (pedido.excluido != true) {
                  this.quantPedidos.length++

                }
              }
              console.log("tamanho" + this.quantPedidos.length)
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

  async detalhes(produtos: Produto) {
    const modal = await this.modal.create({
      component: DetalhesPage,
      componentProps: {
        editingProdutos: produtos
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {

        }
      });

    return await modal.present();
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

    this.database.listar<Categoria>('/categorias')
      .then(categorias => {
        this.categorias = categorias;

        for (let cat of this.categorias) {

          this.uid = cat.uid

          this.database.listar<Produto>('/produtos/' + this.uid)
            .then(produtos => {
              this.produtos = produtos;

              for (var i in this.produtos) {
                var shared = false;
                for (var j in this.produtos2)
                  if (this.produtos2[j].nome == this.produtos[i].nome) {
                    shared = true;
                    break;
                  }
                if (!shared) this.arr3.push(this.produtos[i])
              }

            }).catch(error => {
              console.log(error);
            });

        }
      }).catch(error => {
        console.log(error);
      });
  }
}