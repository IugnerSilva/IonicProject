import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
//import { CameraService } from '../services/camera.services';
import { AngularFireAuth } from '@angular/Fire/auth';
import { Cliente } from '../model/cliente';
import { async } from 'q';
import { Produto } from '../model/produto';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {

  novoProduto: Produto;

  produtos: Produto[];
  categoriaList: Categoria[];

  carregando = true;
  private loading: any;


  constructor(public router: Router, private database: DBService,
    public modalController: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    this.novoProduto = new Produto(); { }
    this.loadAddressList();
  }

  ngOnInit() {
  }

  
  private async loadAddressList() {
    this.categoriaList = await this.database.listWithUIDs<Categoria>('/categoria');
}
  
  cadastro() {
    this.router.navigate(['/listaProdutos'])
  }

  async cadastrar() {
    await this.presentLoading();
    this.database.inserir('produtos', this.novoProduto)
      .then(() => {

        this.presentToast('Produto adicionado com sucesso !');
        this.novoProduto = new Produto();
        this.loading.dismiss();
        this.cadastro();

      });
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde ...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


}
