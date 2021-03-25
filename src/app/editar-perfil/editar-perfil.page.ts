import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Cliente } from '../model/cliente';
import { DBService } from '../services/db.services';
import { AngularFireAuth } from '@angular/Fire/auth';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  novoCliente: Cliente;
  editingCliente: Cliente;
  carregando = true;


  constructor(public router: Router, private database: DBService,
    public modalController: ModalController,
    private afa: AngularFireAuth,
    private toastCtrl: ToastController) {
    this.novoCliente = new Cliente();

  }


  ngOnInit() {

    if (this.editingCliente) {
      this.novoCliente = this.editingCliente;

    }

  }
  voltar() {
    this.modalController.dismiss(this.novoCliente);
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  edit() {
    const updatingObject = {
      numero: this.novoCliente.numero, rua: this.novoCliente.rua, cpf: this.novoCliente.cpf,
      email: this.novoCliente.email, nome: this.novoCliente.nome,
      phone: this.novoCliente.phone, senha: this.novoCliente.senha
    };

    this.database.update('/cliente/' + this.novoCliente.uid, updatingObject)
      .then(() => {
        this.modalController.dismiss(this.novoCliente);
        this.presentToast('Perfil alterado com sucesso!');

      }).catch(error => {
        console.log(error);
      });
  }



}
