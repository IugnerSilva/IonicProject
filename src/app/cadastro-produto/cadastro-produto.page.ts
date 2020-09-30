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
  endereco: string;
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
    if(this.novoProduto.categoriaId === '12345'){
     this.endereco = '/produtos/alimentos'
    } else if(this.novoProduto.categoriaId === '22222'){
      this.endereco = '/produtos/bebidas'
    }else if(this.novoProduto.categoriaId === '789456'){
      this.endereco = '/produtos/limpeza/'
    }
    this.database.inserir(this.endereco, this.novoProduto)
      .then(() => {
        this.modalController.dismiss(this.novoProduto);        
        this.presentToast('Produto adicionado com sucesso !');
        this.router.navigate(['/listaProdutos'])
        this.novoProduto = new Produto();
        this.loading.dismiss();
  
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
    
                             if(this.novoProduto.categoriaId === '12345'){
                              this.endereco = '/produtos/alimentos/'
                             } else if(this.novoProduto.categoriaId === '22222'){
                               this.endereco = '/produtos/bebidas/'
                             }else if(this.novoProduto.categoriaId === '789456'){
                              this.endereco = '/produtos/limpeza/'
                            }
    this.database.update(this.endereco+this.novoProduto.uid, updatingObject)
        .then(() => {
            this.modalController.dismiss(this.novoProduto);
        }).catch(error => {
            console.log(error);
        });
}
voltar(){
  this.modalController.dismiss(this.novoProduto);
}

}
