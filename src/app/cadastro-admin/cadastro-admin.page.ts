import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/Fire/auth';
import { Perfil } from '../model/perfil';
import { Admin } from '../model/admin';

@Component({
  selector: 'app-cadastro-admin',
  templateUrl: './cadastro-admin.page.html',
  styleUrls: ['./cadastro-admin.page.scss'],
})
export class CadastroAdminPage implements OnInit {

  novoAdmin: Admin;

  editingAdmin: Admin;

  perfis: Perfil[];
  carregando = true;
  private loading: any;


  constructor(public router: Router, private database: DBService,
    public modalController: ModalController,
    private loadingCtrl: LoadingController,
    private afa: AngularFireAuth,
    private toastCtrl: ToastController) {
    this.novoAdmin = new Admin();

  }


  ngOnInit() {
    this.inicializarPerfis();
    if (this.editingAdmin) {
      this.novoAdmin = this.editingAdmin;

    }
  }

  async inicializarPerfis() {
    this.perfis = await this.database.listWithUIDs<Perfil>('perfis');
  }


  async cadastrar() {
    await this.presentLoading();
    this.afa.auth.createUserWithEmailAndPassword(this.novoAdmin.email, this.novoAdmin.senha)
    this.database.inserir('admin', this.novoAdmin)
      .then(() => {
        this.presentToast('Administrador adicionado com sucesso');
        this.novoAdmin = new Admin();
        this.loading.dismiss();
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
  voltar() {
    this.modalController.dismiss(this.novoAdmin);
  }
  save() {
    if (this.editingAdmin) {
      this.edit();
    } else {
      this.cadastrar();
    }

  }

  private edit() {
    const updatingObject = {
      cpf: this.novoAdmin.cpf, email: this.novoAdmin.email, nome: this.novoAdmin.nome,
      phone: this.novoAdmin.phone, senha: this.novoAdmin.senha
    };

    this.database.update('/admin/' + this.novoAdmin.uid, updatingObject)
      .then(() => {
        this.modalController.dismiss(this.novoAdmin);
        this.presentToast('Administrador alterado com sucesso!');

      }).catch(error => {
        console.log(error);
      });
  }


}
