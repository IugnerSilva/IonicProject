import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CameraService } from '../services/camera.services';
import { AngularFireAuth } from '@angular/Fire/auth';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
  
  providers: [DBService, CameraService, Camera, Base64]
})
export class CadastroClientePage implements OnInit {

  novoCliente: Cliente;

  editingCliente: Cliente;
  
  carregando = true;
  private loading: any;


  constructor(public router: Router, private database: DBService,
    public modalController: ModalController,
    private cameraService: CameraService,
    private loadingCtrl: LoadingController,
    private afa:AngularFireAuth,
    private toastCtrl: ToastController) {
    this.novoCliente = new Cliente();
   
  }

  
  ngOnInit(){
    
    
}
  
  cadastro() {
    this.router.navigate(['/login'])
  }

  async cadastrar() {
    await this.presentLoading();
    this.afa.auth.createUserWithEmailAndPassword(this.novoCliente.email,this.novoCliente.senha)
    this.database.inserir('cliente', this.novoCliente)
      .then(() => {
        //this.presentToast(message);
        this.novoCliente = new Cliente();
        this.loading.dismiss();
        this.cadastro();
      });
  }


  async tirarFoto() {
    this.novoCliente.picture = await this.cameraService.tirarFoto();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde ...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
  


}
