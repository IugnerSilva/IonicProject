import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
//import { CameraService } from '../services/camera.services';
import { Produto } from '../model/produto';
import { Categoria } from '../model/categoria';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.page.html',
  styleUrls: ['./cadastro-produto.page.scss'],
})
export class CadastroProdutoPage implements OnInit {

  novoProduto: Produto;
  

  editingProdutos: Produto;

  produtos: Produto[];
  categoriaList: Categoria[];

  carregando = true;
  private loading: any;
  delete: string;


  constructor(public router: Router, private database: DBService,
    public modalController: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
    this.novoProduto = new Produto(); 
    this.loadCategoria();
  }

  ngOnInit(){
    
    if (this.editingProdutos) {
        this.novoProduto = this.editingProdutos;
        
    }
  }
  
  private async loadCategoria() {
    this.categoriaList = await this.database.listWithUIDs<Categoria>('/categorias');
}
  
  cadastro() {
    this.router.navigate(['/listaProdutos'])
  }

  async cadastrar() {
    await this.presentLoading();
    this.database.inserir('produtos', this.novoProduto)
      .then(() => {
        this.modalController.dismiss(this.novoProduto);        
        this.presentToast('Produto adicionado com sucesso !');
        this.router.navigate(['/listaProdutos'])
        this.novoProduto = new Produto();
        this.loading.dismiss();
        

      });
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

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde ...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1000 });
    toast.present();
  }
  
  remove(uid: string) {
    this.database.remover('/produtos', uid)
      .then(() => {
        this.presentToast('Produto removido com sucesso !');
      });
  }
  
  save() {
    if (this.editingProdutos) {
        this.edit();
    } else {
        this.cadastrar();
    }


}
  private edit() {
    const updatingObject = {  foto: this.novoProduto.foto, preco: this.novoProduto.preco, nome: this.novoProduto.nome,
                              descricao: this.novoProduto.descricao, categoriaId: this.novoProduto.categoriaId
                             };

    this.database.update('/produtos/'+this.novoProduto.uid, updatingObject)
        .then(() => {
            this.modalController.dismiss(this.novoProduto);
        }).catch(error => {
            console.log(error);
        });
}



}
