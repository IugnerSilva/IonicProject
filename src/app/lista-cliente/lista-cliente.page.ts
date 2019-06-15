import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CadastroPage } from '../cadastro/cadastro.page';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.page.html',
  styleUrls: ['./lista-cliente.page.scss'],
  providers: [DBService]
})
export class ListaClientePage implements OnInit {
  clientes: Cliente[];

  carregando = true;
  loading: any;


  constructor(public router: Router, private database: DBService, public modalController: ModalController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController) {

    this.init();
  }


  private async init() {
    this.carregando = true;

    //await this.presentLoading();
    await this.carregarClientes();
  }

  private async carregarClientes() {
    await this.presentLoading();
    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  remove(uid: string) {
    this.database.remover('/cliente', uid)
      .then(() => {
        alert('Cliente removido com sucesso');
        this.carregarClientes();
      });
  }

  async editar(cliente: Cliente) {
    const modal = await this.modalController.create({
      component: CadastroPage,
      componentProps: {
        editingCliente: cliente
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          alert('Cliente editado com sucesso');

        }
      });

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor,aguarde...' });
    return this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  novo() {
    this.router.navigate(['/cadastro'])
  }
  ngOnInit() {
  }

}
