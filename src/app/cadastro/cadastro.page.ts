import { Component, OnInit } from '@angular/core';
import { Firebase } from '../provider/firebase/firebase';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { Cliente } from '../model/cliente';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CameraService } from '../services/camera.services';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AngularFireAuth } from '@angular/Fire/auth';

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
    
    if (this.editingCliente) {
        this.novoCliente = this.editingCliente;
        
    }
    
}
  
  cadastro() {
    this.router.navigate(['/listaCliente'])
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
  
  save() {
    if (this.editingCliente) {
        this.edit();
    } else {
        this.cadastrar();
    }

}
  private edit() {
    const updatingObject = {  cpf: this.novoCliente.cpf, email: this.novoCliente.email, nome: this.novoCliente.nome,
                              phone: this.novoCliente.phone, senha: this.novoCliente.senha
                             };

    this.database.update('/cliente', updatingObject)
        .then(() => {
            this.modalController.dismiss(this.novoCliente);
        }).catch(error => {
            console.log(error);
        });
}





}
