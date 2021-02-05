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
import { DetalhesCliPedidosPage } from '../detalhes-cli-pedidos/detalhes-cli-pedidos.page';

@Component({
  selector: 'app-pedido-cliente',
  templateUrl: './pedido-cliente.page.html',
  styleUrls: ['./pedido-cliente.page.scss'],
})
export class PedidoClientePage implements OnInit {
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
  array = [];
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

          console.log(this.arr3);
        }

      }).catch(error => {
        console.log(error);
      });

  }

  async detalhes(uid: string) {

    const modal = await this.modal.create({
      component: DetalhesCliPedidosPage,
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

  remove(uid: string) {
    this.database.remover('/pedidos/' + this.uid, uid)

  }

  filtrar(ev: any) {

    const val = ev.target.value;
    if (val && val.trim() != '') {

      this.arr3 = this.arr3.filter((item) => {
        return (item.data.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
          item.nomeCli.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })

    }
    else {
      this.arr3 = [];
      this.listarPedidos();
    }
  }



}


