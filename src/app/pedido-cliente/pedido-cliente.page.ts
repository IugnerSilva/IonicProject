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
import { AppComponent } from '../app.component';

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
  excluido: boolean;
  constructor(public router: Router, private database: DBService, public modal: ModalController,
    private loadingCtrl: LoadingController, private app: AppComponent,private afa: AngularFireAuth, private toastCtrl: ToastController) {


  }
  async ngOnInit() {
    
    this.app.inicializarDadosLogin();
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

  async remove(confirmarPedidos) {
    
      this.excluido = true
     
      confirmarPedidos = {
        uid: confirmarPedidos.uid,uidCli: confirmarPedidos.uidCli, rua: confirmarPedidos.rua, numero: confirmarPedidos.numero, 
        formaPagamento: confirmarPedidos.formaPagamento, nomeCli: confirmarPedidos.nomeCli,
         data: confirmarPedidos.data,status:confirmarPedidos.status, excluido:this.excluido
    };
    this.database.update('/pedidos/' + confirmarPedidos.uidCli + "/"+ confirmarPedidos.uid, confirmarPedidos)
      .then(() => {
      }).catch(error => {
        console.log(error);
      });
    

        await location.reload();
        this.presentToast('Pedido removido com sucesso!');
        
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
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


