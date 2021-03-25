import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Pedidos } from '../model/pedidos';
import { DBService } from '../services/db.services';
import { Cliente } from '../model/cliente';
import { AngularFireAuth } from '@angular/Fire/auth';
import { ItemPedido } from '../model/itemPedido';

@Component({
  selector: 'app-detalhes-pedidos',
  templateUrl: './detalhes-cli-pedidos.page.html',
  styleUrls: ['./detalhes-cli-pedidos.page.scss'],
})
export class DetalhesCliPedidosPage implements OnInit {
  data: string = new Date().toISOString();
  minDate: string = new Date().toISOString();
  maxDate: string = new Date().toISOString();
  
  uid: string;
  novoUid: string;
  editingPedidos: string;
  clientes: Cliente[];
  pedidos: Pedidos[];
  pedidos2: Pedidos[];
  total = 0;
  arr3 = [];
  status:string;
  itensPedido: ItemPedido[];
  itensPedido2: ItemPedido[];
  arr4 =[];
  data_entrega: string;

  constructor(public navCtrl: NavController,
    private activatedRoute: ActivatedRoute, private afa: AngularFireAuth,
    public modalController: ModalController, private database: DBService, private plataform: Platform) {
      this.plataform.ready().then(() => {

        let date: Date = new Date();
        date.setDate(date.getDate() - 5);
        this.minDate = date.toISOString();
  
        date = new Date();
        date.setDate(date.getDate() + 5);
        this.maxDate = date.toISOString();
      })
      

  }
  ngOnInit() {

    if (this.editingPedidos) {
      this.novoUid = this.editingPedidos;

      this.database.listar<Cliente>('/cliente')
        .then(clientes => {
          this.clientes = clientes;

          for (let cli of this.clientes) {

            this.uid = cli.uid

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

              this.database.listar<ItemPedido>('/itemPedido/' + this.uid)
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
                  console.log(this.uid)
                
                }).catch(error => {
                  console.log(error);
                });
          }
        }).catch(error => {
          console.log(error);
        });
    }
  }

  confirmarPedido(confirmarPedidos) {
    
    this.status = "Confirmado"
    this.data_entrega = this.data
    confirmarPedidos = {
      uid: confirmarPedidos.uid,uidCli: confirmarPedidos.uidCli, rua: confirmarPedidos.rua, numero: confirmarPedidos.numero, 
      formaPagamento: confirmarPedidos.formaPagamento, nomeCli: confirmarPedidos.nomeCli,
       data: confirmarPedidos.data,status:this.status, data_entrega: this.data_entrega
  };
  this.database.update('/pedidos/' + confirmarPedidos.uidCli + "/"+ confirmarPedidos.uid, confirmarPedidos)
    .then(() => {
      this.modalController.dismiss(confirmarPedidos);
    }).catch(error => {
      console.log(error);
    });
  }
  voltar() {
    this.modalController.dismiss(this.novoUid);
  }

}
