import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { Pedidos } from '../model/pedidos';
import { DBService } from '../services/db.services';
import { AngularFireAuth } from '@angular/Fire/auth';
import { DetalhesCliPedidosPage } from '../detalhes-cli-pedidos/detalhes-cli-pedidos.page';
import { DetalheHistoricoPage } from '../detalhe-historico/detalhe-historico.page';
import { DetalheCliHistoricoPage } from '../detalhe-cli-historico/detalhe-cli-historico.page';

@Component({
  selector: 'app-historico-detalhes',
  templateUrl: './historico-detalhes.page.html',
  styleUrls: ['./historico-detalhes.page.scss'],
})
export class HistoricoDetalhesPage implements OnInit {

  uid: string;
  novoUid: string;
  editingPedidos: string;
  clientes: Cliente[];
  pedidos: Pedidos[];
  pedidos2: Pedidos[];
  total = 0;
  arr3 = [];

  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute, private afa: AngularFireAuth,
    public modalController: ModalController, public modale: ModalController, private database: DBService) {

  }
  ngOnInit() {

    if (this.editingPedidos) {
      this.novoUid = this.editingPedidos;

      this.database.listar<Cliente>('/cliente')
        .then(clientes => {
          this.clientes = clientes;

          this.database.listar<Pedidos>('/pedidos/' + this.novoUid)
            .then(pedidos => {
              this.pedidos = pedidos;

            }).catch(error => {
              console.log(error);
            });

        }).catch(error => {
          console.log(error);
        });
    }
  }

  voltar() {
    this.modalController.dismiss(this.novoUid);
  }

  async detalhes(uid: string) {
    const modal = await this.modale.create({
      component: DetalheCliHistoricoPage,
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
      this.pedidos = [];
      this.ngOnInit();
    }
  }
}
