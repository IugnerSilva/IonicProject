import { Component, EventEmitter} from '@angular/core';
import {LoadingController, ToastController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Cliente } from '../model/cliente';
import { AngularFireAuth } from '@angular/Fire/auth';
import { DBService } from '../services/db.services';
import { AuthService } from '../services/auth.services';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  providers: [DBService]
})
export class LoginPage {

  private loading: any;
  cliente:Cliente;
  usuarioId: string;
  uid:string;
  user: any;
  usuarioLogado = new EventEmitter<boolean>();
  logado = new EventEmitter<boolean>();

  constructor(private router: Router, private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private afa:AngularFireAuth, private auth:AuthService, private menu: MenuController) {

      this.cliente = new Cliente
      
  }

  async login() {
    await this.auth.fazerLogin(this.cliente);
  }

  ionViewDidEnter(){
    this.menu.enable(false)
    
    this.cliente = new Cliente
  }

  ionViewWillLeave(){
    this.menu.enable(true)
    
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde ...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  cadastrar() {
    this.router.navigate(['/cadastrar'])
  }

}
