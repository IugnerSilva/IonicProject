import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { Cliente } from '../model/cliente';
import { ModalController, LoadingController, ToastController, NavController, MenuController } from '@ionic/angular';
import { CameraService } from '../services/camera.services';
import { Camera } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AngularFireAuth } from '@angular/Fire/auth';
import { AuthService } from '../services/auth.services';
import { Admin } from '../model/admin';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
  providers: [DBService, CameraService, Camera, Base64]
})
export class CadastrarPage {

  novoCliente: Cliente = new Cliente;

  editingCliente: Cliente;

  emailCli: string;
  cliente: Cliente[];
  admin: Admin[];
  carregando = true;


  constructor(public router: Router, private database: DBService,
    private menu: MenuController,
    private toastCtrl: ToastController,
    private auth: AuthService) {

  }

  async cadastrar() {
    this.auth.criarUsuario(this.novoCliente)
    this.database.listar<Admin>('/admin')
      .then(admin => {
        this.admin = admin;
        for (let admin of this.admin) {
          this.database.listar<Cliente>('/cliente')
            .then(clientes => {
              this.cliente = clientes;
              for (let cli of this.cliente) {


                if (this.novoCliente.email != cli.email && this.novoCliente.email != admin.email) {


                  this.database.inserir('cliente', this.novoCliente)
                    .then(() => {
                      this.presentToast('Cliente cadastrado com sucesso !');
                      this.novoCliente = new Cliente();
                      this.router.navigate(['/home'])
                    }).catch(error => {
                      this.presentToast('Ops! Algo deu errado tente novamente !');
                    });

                } else {

                  this.presentToast('Já existe uma conta com esse email !');
                  break
                }
              }

            }).catch(error => {
              console.log(error);
            });
        }
      }).catch(error => {
        console.log(error);
      });

  }


  ionViewDidEnter() {
    this.menu.enable(false)

  }

  ionViewWillLeave() {
    this.menu.enable(true)

  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
