import { Component, OnInit } from '@angular/core';
import { Pedidos } from '../model/pedidos';
import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/Fire/auth';
import { DetalheHistoricoPage } from '../detalhe-historico/detalhe-historico.page';
import { DetalhesCliPedidosPage } from '../detalhes-cli-pedidos/detalhes-cli-pedidos.page';
import { HistoricoDetalhesPage } from '../historico-detalhes/historico-detalhes.page';

@Component({
  selector: 'app-historico-cliente',
  templateUrl: './historico-cliente.page.html',
  styleUrls: ['./historico-cliente.page.scss'],
})
export class HistoricoClientePage implements OnInit {
  loading: any;
  carregando = true;
  novoPedido: Pedidos;
  clientes: Cliente[];
  uid: string;
  uidCli: string;
  data: string;
  count = 0;
  pedidos: Pedidos[];
  pedidos2: Pedidos[];
  arr3 = [];

  constructor(public router: Router, private database: DBService, public modal: ModalController,
    private loadingCtrl: LoadingController, private afa: AngularFireAuth, private toastCtrl: ToastController) {


  }
  async ngOnInit() {

    await this.listarPedidos();
  }


  async listarPedidos() {

    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;

        this.clientes = clientes;

      }).catch(error => {
        console.log(error);
      });
  }



  async detalhes(uid: string) {

    const modal = await this.modal.create({
      component: HistoricoDetalhesPage,
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

      this.clientes = this.clientes.filter((item) => {
        return (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

    }
    else {
      this.arr3 = [];
      this.listarPedidos();
    }
  }
}
