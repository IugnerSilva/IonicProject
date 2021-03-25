import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Categoria } from '../model/categoria';
import { DBService } from '../services/db.services';
import { AngularFireAuth } from '@angular/Fire/auth';
import { CadastroCategoriaPage } from '../cadastro-categoria/cadastro-categoria.page';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.page.html',
  styleUrls: ['./lista-categorias.page.scss'],
})
export class ListaCategoriasPage implements OnInit {

  categorias: Categoria[];
  carregando = true;
  loading: any;

  constructor(public router: Router, private database: DBService,private afa:AngularFireAuth, 
    public modalController: ModalController,private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController) {
}

  async ngOnInit() {

    await this.carregarCategorias();
  }

  private async carregarCategorias() {
    this.database.listar<Categoria>('/categorias')
      .then(categorias => {
        this.categorias = categorias;
      }).catch(error => {
        console.log(error);
      });
  }

  remove(uid: string) {
    this.database.remover('/categorias', uid)
      .then(() => {
        this.presentToast('Categoria removida com sucesso!');

        this.carregarCategorias();
      });
      
  }

  async editar(categorias: Categoria) {
    const modal = await this.modalController.create({
      component: CadastroCategoriaPage,
      componentProps: {
        editingCategoria: categorias
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
        }
      });
      
    return  await modal.present();
  }
                                                            
  async add() {
    const modal = await this.modalController.create({
      component: CadastroCategoriaPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
        }
      });

    return  await modal.present();
  }

  lista() {
    this.router.navigate(['/lista-categorias'])
  }

  private confirmAdd() {
    this.carregarCategorias();
    this.lista();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor,aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}
