import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Produto } from '../model/produto';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {
  loading: any;
  produtos: Produto[];

  carregando = true;

  constructor(public router: Router,private database: DBService,public modalController: ModalController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController) { 
      this.init();
  }


  private async init() {
    this.carregando = true;
    
    
    await this.carregarProdutos();
  }

  private async carregarProdutos() {
    await this.presentLoading();
    this.database.listar<Produto>('/produtos')
      .then(produtos => {
        this.produtos = produtos;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  remove(uid: string) {
    this.database.remover('/produtos', uid)
      .then(() => {
        this.presentToast('Produto removido com sucesso !');
        this.carregarProdutos();
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
    this.router.navigate(['/cadastroProduto'])
  }

  
  ngOnInit() {
  }

}
