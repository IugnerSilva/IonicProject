
import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/carrinho.services';
import { Pedidos } from '../model/pedidos';
import { LoadingController, ToastController } from '@ionic/angular';
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
 
 selectedItems = [];
  cart:Produto[];
  clientes: Cliente[];
  carregando = true;
  novoPedido : Pedidos;
  private loading: any;
  total = 0;
  uid:string;
 
  constructor(private cartService: CarService, private loadingCtrl: LoadingController,
              private toastCtrl: ToastController, private database: DBService,public router: Router
              ,private afa:AngularFireAuth) {
    }
    
  async ngOnInit() {  
    
    var user = this.afa.auth.currentUser;
    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        for(let cli of this.clientes){
          if(user.email == cli.email){
            this.uid = cli.uid
          }
        }
        
    console.log('id usuario'+this.uid)
      }).catch(error => {
        console.log(error);
      });
    this.cart= this.cartService.getCart();
    this.total = this.cart.reduce((a, b) => a + (b.amount * b.preco), 0);
   
  }

  async comprar() {
    for (let obj of this.cart) {
      this.novoPedido = { uid:obj.uid, nome: obj.nome, preco: obj.preco, amount: obj.amount
       };
      
    //await this.presentLoading();
    console.log("ususus"+this.uid)
    this.database.inserir('pedidos/'+this.uid, this.novoPedido)
      .then(() => {this.novoPedido =  new Pedidos;
        this.presentToast('Produto solicitado com sucesso !');
        this.router.navigate(['/home'])
   // this.loading.dismiss();
        
      });
    
      
    //await this.presentLoading();
    console.log("ususus"+this.uid)
    this.database.inserir('historicoCliente/'+this.uid, this.novoPedido)
      .then(() => {
        this.novoPedido =  new Pedidos;
        this.router.navigate(['/home'])
        this.novoPedido =  new Pedidos;
    //this.loading.dismiss();
        
      });
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
 
