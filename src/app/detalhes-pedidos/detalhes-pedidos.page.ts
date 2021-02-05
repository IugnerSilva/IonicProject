import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Pedidos } from '../model/pedidos';
import { DBService } from '../services/db.services';
import { Cliente } from '../model/cliente';

import { AngularFireAuth } from '@angular/Fire/auth';
@Component({
  selector: 'app-detalhes-pedidos',
  templateUrl: './detalhes-pedidos.page.html',
  styleUrls: ['./detalhes-pedidos.page.scss'],
})
export class DetalhesPedidosPage implements OnInit {

  uid: string;
  novoUid: Cliente;
  editingPedidos: Cliente;

  clientes: Cliente[];
  pedidos: Pedidos[];

  pedidos2: Pedidos[];
  total = 0;

  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute, private afa: AngularFireAuth, public modalController: ModalController, private database: DBService) {

  }
  ngOnInit() {

    if (this.editingPedidos) {
      this.novoUid = this.editingPedidos;

      var user = this.afa.auth.currentUser;
      this.database.listar<Cliente>('/cliente')
        .then(clientes => {
          this.clientes = clientes;
          for (let cli of this.clientes) {
            if (user.email == cli.email) {

              this.uid = cli.uid;
              this.database.listar<Pedidos>('/pedidos/' + this.uid)
                .then(pedidos => {
                  this.pedidos2 = pedidos;

                  console.log(this.novoUid);

                }).catch(error => {
                  console.log(error);
                });
            }
          }
        }).catch(error => {
          console.log(error);
        });
    }
  }

  voltar() {
    this.modalController.dismiss(this.novoUid);
  }

}
