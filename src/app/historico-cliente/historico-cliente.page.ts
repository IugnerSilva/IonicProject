import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../model/pedidos';
import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/Fire/auth';
import { DetalheHistoricoPage } from '../detalhe-historico/detalhe-historico.page';

@Component({
  selector: 'app-historico-cliente',
  templateUrl: './historico-cliente.page.html',
  styleUrls: ['./historico-cliente.page.scss'],
})
export class HistoricoClientePage implements OnInit {
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
        
  
    this.database.listar<Pedidos>('/historicoCliente')
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
        
  async detalhes(uid: Cliente) {
    
    console.log(this.uid);
    const modal = await this.modal.create({
      component: DetalheHistoricoPage,
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
