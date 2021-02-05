
import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/carrinho.services';
import { Pedidos } from '../model/pedidos';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Produto } from '../model/produto';
import { DBService } from '../services/db.services';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { AngularFireAuth } from '@angular/Fire/auth';

@Component({
  selector: 'app-cart',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  data: string = new Date().toISOString();
  minDate: string = new Date().toISOString();
  maxDate: string = new Date().toISOString();

  selectedItems = [];
  cart: Produto[];
  clientes: Cliente[];
  carregando = true;
  novoPedido: Pedidos;
  private loading: any;
  total = 0;
  uid: string;
  nomeCli: string;
  rua: string;
  numero: number;
  formaPagamento: string;

  constructor(private cartService: CarService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private database: DBService, public router: Router
    , private afa: AngularFireAuth, private plataform: Platform) {


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

    var user = this.afa.auth.currentUser;
    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        for (let cli of this.clientes) {
          if (user.email == cli.email) {
            this.uid = cli.uid
            this.nomeCli = cli.nome
            this.rua = cli.rua
            this.numero = cli.numero
          }
        }

        console.log('id usuario' + this.uid)
      }).catch(error => {
        console.log(error);
      });
    this.cart = this.cartService.getCart();
    this.total = this.cart.reduce((a, b) => a + (b.amount * b.preco), 0);

  }

  async comprar() {
    this.novoPedido = {
      uid: this.uid, rua: this.rua, numero: this.numero, formaPagamento: this.formaPagamento, nomeCli: this.nomeCli,
      total: this.total, data: this.data, pedido: this.cart
    };

    if (this.cart.length > 0) {
      this.database.inserir('pedidos/' + this.uid, this.novoPedido)
        .then(() => {
          this.presentToast('Pedido solicitado com sucesso !');

        }).catch(error => {
          this.presentToast('Preecha todos os campos !');
        });

      this.database.inserir('historicoCliente/' + this.uid, this.novoPedido)
        .then(() => {

          this.cartService.cart = []
          this.router.navigate(['/home'])

        }).catch(error => {
        });
    }
    else {
      this.presentToast('Não há produtos no carrinho !');
    }
  }
  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde ...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1000 });
    toast.present();
  }

}




