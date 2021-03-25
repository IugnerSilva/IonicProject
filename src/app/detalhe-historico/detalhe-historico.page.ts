import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Pedidos } from '../model/pedidos';
import { NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DBService } from '../services/db.services';
import { ItemPedido } from '../model/itemPedido';
import { AngularFireAuth } from '@angular/Fire/auth';

@Component({
  selector: 'app-detalhe-historico',
  templateUrl: './detalhe-historico.page.html',
  styleUrls: ['./detalhe-historico.page.scss'],
})
export class DetalheHistoricoPage implements OnInit {

  uid: string;
  novoUid: Cliente;
  editingPedidos: Cliente;
  clientes: Cliente[];
  pedidos: Pedidos[];
  arr3 = [];
  pedidos2: Pedidos[];
  total = 0;
  itensPedido: ItemPedido[];

  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute, public modalController: ModalController, 
    private afa: AngularFireAuth,private database: DBService) {

  }
  ngOnInit() {
    
    var user = this.afa.auth.currentUser;
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

              if (user.email == cli.email) {
                this.uid = cli.uid;
              this.database.listar<ItemPedido>('/itemPedido/' + this.uid)
                .then(itensPedido => {
                  this.itensPedido = itensPedido;
                }).catch(error => {
                  console.log(error);
                });}



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
