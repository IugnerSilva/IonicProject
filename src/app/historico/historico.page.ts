import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { DetalheHistoricoPage } from '../detalhe-historico/detalhe-historico.page';
import { Cliente } from '../model/cliente';
import { Pedidos } from '../model/pedidos';
import { DBService } from '../services/db.services';
import { AngularFireAuth } from '@angular/Fire/auth';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
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
    public modalController: ModalController, public modalee: ModalController, private database: DBService) {

  }
  ngOnInit() {

    var user = this.afa.auth.currentUser;
    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        for (let cli of this.clientes) {
          if (user.email == cli.email) {

            this.uid = cli.uid;
            this.database.listar<Pedidos>('/historicoCliente/' + this.uid)
              .then(pedidos => {
                this.pedidos = pedidos;

                console.log(this.pedidos);

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

        console.log(this.pedidos);

      }).catch(error => {
        console.log(error);
      });
  }

  voltar() {
    this.modalController.dismiss(this.novoUid);
  }
  async detalhes(uid: string) {
    const modal = await this.modalee.create({
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

    return await modal.present();
  }
}
