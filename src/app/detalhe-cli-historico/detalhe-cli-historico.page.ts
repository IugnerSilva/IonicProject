import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/Fire/auth';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { ItemPedido } from '../model/itemPedido';
import { Pedidos } from '../model/pedidos';
import { DBService } from '../services/db.services';
@Component({
  selector: 'app-detalhe-cli-historico',
  templateUrl: './detalhe-cli-historico.page.html',
  styleUrls: ['./detalhe-cli-historico.page.scss'],
})
export class DetalheCliHistoricoPage implements OnInit {

  uid: string;
  novoUid: Cliente;
  editingPedidos: Cliente;
  clientes: Cliente[];
  pedidos: Pedidos[];
  arr3 = [];
  pedidos2: Pedidos[];
  total = 0;
  itensPedido: ItemPedido[];
  itensPedido2: ItemPedido[];
  arr4 = [];

  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute, public modalController: ModalController, 
    private afa: AngularFireAuth,private database: DBService) {

  }
  ngOnInit() {
    
    if (this.editingPedidos) {
      this.novoUid = this.editingPedidos;

      this.database.listar<Cliente>('/cliente')
        .then(clientes => {
          this.clientes = clientes;
          for (let cli of this.clientes) {
            
            this.database.listar<Pedidos>('/pedidos/' + cli.uid)
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

              this.database.listar<ItemPedido>('/itemPedido/' + cli.uid)
              .then(itensPedido => {
                this.itensPedido = itensPedido;
                for (var i in this.itensPedido) {
                  var shared = false;
                  for (var j in this.itensPedido2)
                    if (this.itensPedido2[j].uidPedidos == this.itensPedido[i].uidPedidos) {
                      shared = true;
                      break;
                    }
                  if (!shared) this.arr4.push(this.itensPedido[i])

                }
                }).catch(error => {
                  console.log(error);
                });



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
