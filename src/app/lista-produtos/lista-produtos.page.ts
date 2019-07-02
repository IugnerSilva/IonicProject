import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController, NavParams } from '@ionic/angular';
import { Produto } from '../model/produto';
import { CadastroProdutoPage } from '../cadastro-produto/cadastro-produto.page';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
})
export class ListaProdutosPage implements OnInit {
  loading: any;
  produtos: Produto[];
  uid : string;
  carregando = true;

  constructor(public router: Router,private database: DBService,public modal: ModalController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController, ) { 

  }
 
  async ngOnInit() {
    
    this.carregando = true;
    
    
    await this.carregarProdutos();
  }

  // carregarcategorias
  // criararray
   // percorrerarraycategorias
  // pecorrerarrayprodutos
  // jogarnoarraydemassas
 

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

  async add() {
    const modal = await this.modal.create({
      component: CadastroProdutoPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
          
        }
      });

    return  await modal.present();
  }

  private confirmAdd() {
    this.presentToast('Produto adicionado com sucesso');
    this.carregarProdutos();
    
  }
  async editar(produtos: Produto) {
    const modal = await this.modal.create({
      component: CadastroProdutoPage,
      componentProps: {
        editingProdutos: produtos
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {

        }
      });

      
    return  await modal.present();
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

  

}
