import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.services';
import { ToastController } from '@ionic/angular';
import { Perfil } from '../model/perfil';

@Component({
  selector: 'app-cadastro-perfil',
  templateUrl: './cadastro-perfil.page.html',
  styleUrls: ['./cadastro-perfil.page.scss'],
})
export class CadastroPerfilPage implements OnInit {

  novoPerfil: Perfil;
  constructor(private dbService: DBService, public toastController: ToastController) {

    this.novoPerfil = new Perfil();

  }

  ngOnInit() {
  }

  async save() {

    await this.dbService.inserir('perfis', this.novoPerfil);

    this.novoPerfil = new Perfil();

    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Perfil cadastrado com sucesso.',
      duration: 2000
    });
    toast.present();
  }
}
