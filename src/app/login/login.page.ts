import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { CadastroPage } from '../cadastro/cadastro.page';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { AngularFireAuth } from '@angular/Fire/auth';
import { DBService } from '../services/db.services';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  providers: [DBService]
})
export class LoginPage {

  private loading: any;
  cliente:Cliente;


  constructor(private router: Router, private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private afa:AngularFireAuth,
    private database: DBService) {

      this.cliente = new Cliente

  }

  async login() {
    await this.presentLoading();

    try {
      this.afa.auth.signInWithEmailAndPassword(this.cliente.email,this.cliente.senha);
    
      this.router.navigate(['/menu/home']);

    } catch (error) {
      this.presentToast(error.message);

    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde ...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  cadastra() {
    this.router.navigate(['/cadastro'])
  }

}
