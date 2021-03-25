import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Categoria } from '../model/categoria';
import { Produto } from '../model/produto';
import { DBService } from '../services/db.services';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.page.html',
  styleUrls: ['./cadastro-categoria.page.scss'],
})
export class CadastroCategoriaPage implements OnInit {

  novaCategoria: Categoria;

  editingCategoria: Categoria;

  constructor(public router: Router, private database: DBService,
    public modalController: ModalController,
    private toastCtrl: ToastController) {
      
    this.novaCategoria = new Categoria();
  }

  ngOnInit() {
    if (this.editingCategoria) {
      this.novaCategoria = this.editingCategoria;

    }
  }

  save() {
    if (this.editingCategoria) {
      this.edit();
    } else {
      this.cadastrar();
    }
  }
  voltar() {
    this.modalController.dismiss(this.novaCategoria);
  }

  private edit() {
    const updatingObject = {
       nome: this.novaCategoria.nome,
    };

    this.database.update('/categorias/' + this.novaCategoria.uid, updatingObject)
      .then(() => {
        this.modalController.dismiss(this.novaCategoria);
        this.presentToast('Categoria alterada com sucesso!');

      }).catch(error => {
        console.log(error);
      });
  }

  async cadastrar() {

    this.database.inserir('/categorias/',this.novaCategoria)
      .then(() => {
        this.modalController.dismiss(this.novaCategoria);
        this.presentToast('Categoria adicionada com sucesso !');
        this.router.navigate(['/lista-categorias'])

      }).catch(error => {
        this.presentToast('Preecha todos os campos solicitados!');
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1000 });
    toast.present();
  }

  remove(uid: string) {
    this.database.remover('/categorias', uid)
      .then(() => {
        this.presentToast('Categoria removido com sucesso !');
      });
  }
}
