import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/carrinho.services';
import { Pedidos } from '../model/pedidos';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Produto } from '../model/produto';
import { DBService } from '../services/db.services';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { AngularFireAuth } from '@angular/Fire/auth';
import { DetalhesPedidosPage } from '../detalhes-pedidos/detalhes-pedidos.page';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  loading: any;
  carregando = true;
  pedidos: Pedidos[];
  novoPedido: Pedidos;
  clientes: Cliente[];
  uid:string;
  total = 0;

  constructor(public router: Router,private database: DBService,public modal: ModalController,
    private loadingCtrl: LoadingController,private afa:AngularFireAuth, private toastCtrl: ToastController) { 

  }
  async ngOnInit() {  
    
    var user = this.afa.auth.currentUser;
    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        for(let cli of this.clientes){
          if(user.email == cli.email){
            this.uid = cli.uid;
          }
        }
        
  
    this.database.listar<Pedidos>('/pedidos')
      .then(pedidos => {
        this.pedidos = pedidos;
        for(let p of this.pedidos){
        
        }
        console.log(this.pedidos);

        
    this.total = this.pedidos.reduce((a, b) => a + (b.amount * b.preco), 0);
        
      }).catch(error => {
        console.log(error);
      });

      

      }).catch(error => {
        console.log(error);
      });
  }
  // "como ver o proprio pedido"
 /*var user = this.afa.auth.currentUser;
    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        for(let cli of this.clientes){
          if(user.email == cli.email){
            this.uid = cli.uid;
          }
        }*/
        
  async detalhes(uid: Cliente) {
    
    console.log(this.uid);
    const modal = await this.modal.create({
      component: DetalhesPedidosPage,
      componentProps: {
        editingPedidos: uid
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {

        }
      });

    return  await modal.present();
  }
}
