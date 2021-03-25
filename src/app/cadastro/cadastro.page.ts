import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { Cliente } from '../model/cliente';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CameraService } from '../services/camera.services';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AngularFireAuth } from '@angular/Fire/auth';
import { Admin } from '../model/admin';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  providers: [DBService, CameraService, Camera, Base64]
})
export class CadastroPage {

  novoCliente: Cliente;
  editingCliente: Cliente;
  carregando = true;
  admins: Admin[];
  usuario: Admin;


  constructor(public router: Router, private database: DBService,
    public modalController: ModalController,
    private afa: AngularFireAuth,
    private auth:AuthService,
    private toastCtrl: ToastController,) {
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

  async cadastrar() {
    this.afa.auth.createUserWithEmailAndPassword(this.novoCliente.email, this.novoCliente.senha)
    this.database.inserir('cliente', this.novoCliente)
      .then(() => {
        this.novoCliente = new Cliente();
        this.modalController.dismiss(this.novoCliente);
        this.presentToast('Cliente cadastrado com sucesso!');
      }).catch(error => {
        this.presentToast('Email ou senha inválidos !');
      });
  }



  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  save() {
    if (this.editingCliente) {
      this.edit();
    } else {
      this.cadastrar();
    }

  }
  private edit() {
    const updatingObject = {
      numero: this.novoCliente.numero, rua: this.novoCliente.rua, cpf: this.novoCliente.cpf,
      email: this.novoCliente.email, nome: this.novoCliente.nome,
      phone: this.novoCliente.phone, senha: this.novoCliente.senha
    };

    this.database.update('/cliente/' + this.novoCliente.uid, updatingObject)
      .then(() => {
        this.modalController.dismiss(this.novoCliente);
        this.presentToast('Cliente alterado com sucesso!');

      }).catch(error => {
        console.log(error);
      });
  }

}
