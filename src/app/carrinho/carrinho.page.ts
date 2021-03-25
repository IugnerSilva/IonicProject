
import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/carrinho.services';
import { Pedidos } from '../model/pedidos';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Produto } from '../model/produto';
import { DBService } from '../services/db.services';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { AngularFireAuth } from '@angular/Fire/auth';
import { ItemPedido } from '../model/itemPedido';

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
  itemPedido: ItemPedido;
  private loading: any;
  total = 0;
  uid: string;
  uidCli: string;
  nomeCli: string;
  rua: string;
  numero: number;
  formaPagamento: string;
  status:string;
  pedidos: Pedidos[];
  pedidos2: Pedidos[];
  arr3 = [];
  array = [];
  igual:string;
  uidPedidos: string;
  excluido: boolean;

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
            this.uidCli = cli.uid
            this.nomeCli = cli.nome
            this.rua = cli.rua
            this.numero = cli.numero
          }
        }

      }).catch(error => {
        console.log(error);
      });
    this.cart = this.cartService.getCart();
    this.total = this.cart.reduce((a, b) => a + (b.quantidade * b.preco), 0);
    this.status = "Aguardando confirmação"
    this.excluido = false;

  }

  async comprar() {
    
    const novoPedido = {
      uidCli: this.uidCli, rua: this.rua, numero: this.numero, formaPagamento: this.formaPagamento, 
      nomeCli: this.nomeCli, data: this.data, status:this.status,total:this.total, excluido: this.excluido
    };

    if (this.cart.length > 0) {
      this.database.inserir('pedidos/' + this.uidCli, novoPedido)
        .then(() => {
          this.presentToast('Pedido solicitado com sucesso !');

        }).catch(error => {
          this.presentToast('Preecha todos os campos !');
        });
        

    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;

          this.database.listar<Pedidos>('/pedidos/' + this.uidCli)
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
                for(let p of this.arr3){
                  this.igual = p.data
                  this.uidPedidos = p.uid
                }

                  if(this.igual == novoPedido.data){
                    console.log("carrinho"+this.cart)
                    for(let item of this.cart){
                    
                    const itemPedido = { uidPedidos:this.uidPedidos, nomeProduto:item.nome,
                                        precoProduto:item.preco,quantidadeProduto:item.quantidade,uidProduto:item.uid}

                    this.database.inserir('itemPedido/' + this.uidCli, itemPedido)
                    .then(() => {
                      this.cartService.cart = []
                      this.router.navigate(['/home'])
                        

                     }).catch(error => {
                      this.presentToast('Preecha todos os campos !');
                     });     }
                }

              
            }).catch(error => {
              console.log(error);
            });

      }).catch(error => {
        console.log(error);
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




