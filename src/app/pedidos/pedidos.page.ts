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
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  loading: any;
  carregando = true;
  pedidos: Pedidos[];
  pedidos2: Pedidos[];
  novoPedido: Pedidos;
  clientes: Cliente[];
  uid: string;
  data: string;
  total = 0;

  constructor(public router: Router, private database: DBService, private app: AppComponent, public modal: ModalController,
    private loadingCtrl: LoadingController, private afa: AngularFireAuth, private toastCtrl: ToastController) {


  }
  async ngOnInit() {

    this.app.inicializarDadosLogin();

    var user = this.afa.auth.currentUser;
    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        for (let cli of this.clientes) {
          if (user.email == cli.email) {

            this.uid = cli.uid;
            this.database.listar<Pedidos>('/pedidos/' + this.uid)
              .then(pedidos => {
                this.pedidos = pedidos;

              }).catch(error => {
                console.log(error);
              });
          }
        }
      }).catch(error => {
        console.log(error);
      });

    this.database.listar<Pedidos>('/pedidos/')
      .then(pedidos => {
        this.pedidos2 = pedidos;


      }).catch(error => {
        console.log(error);
      });

  }

  async detalhes(uid: Cliente) {

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

    return await modal.present();
  }

  filtrar(ev: any) {

    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.pedidos = this.pedidos.filter((item) => {
        return (item.data.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.database.listar<Pedidos>('/pedidos')
      .then(pedidos => {
        this.pedidos2 = pedidos;
        for (let p of this.pedidos2) {
        }
      })

      this.database.listar<Pedidos>('/pedidos/' + this.uid)
        .then(pedidos => {
          this.pedidos = pedidos;

        }).catch(error => {
          console.log(error);
        });
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
