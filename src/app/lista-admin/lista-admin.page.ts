import { Component, OnInit } from '@angular/core';
import { Admin } from '../model/admin';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/Fire/auth';
import { CadastroAdminPage } from '../cadastro-admin/cadastro-admin.page';

@Component({
  selector: 'app-lista-admin',
  templateUrl: './lista-admin.page.html',
  styleUrls: ['./lista-admin.page.scss'],
})
export class ListaAdminPage implements OnInit {

  admins: Admin[];
  carregando = true;
  loading: any;


  constructor(public router: Router, private database: DBService,private afa:AngularFireAuth, 
              public modalController: ModalController,private loadingCtrl: LoadingController, 
              private toastCtrl: ToastController) {
  }

  async ngOnInit() {
    
    this.carregando = true;

    await this.presentLoading();
    await this.carregarAdmins();
  }

  private async carregarAdmins() {
    this.database.listar<Admin>('/admin')
      .then(admins => {
        this.admins = admins;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  remove(uid: string) {
    this.database.remover('/admin', uid)
      .then(() => {
        this.presentToast('Administrador removido com sucesso!');

        this.carregarAdmins();
      });
      
  }

  async editar(admins: Admin) {
    const modal = await this.modalController.create({
      component: CadastroAdminPage,
      componentProps: {
        editingAdmin: admins
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {

        }
      });

    return  await modal.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor,aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  
  async add() {
    const modal = await this.modalController.create({
      component: CadastroAdminPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
        }
      });

    return  await modal.present();
  }

  private confirmAdd() {
    this.carregarAdmins();
  }

  
  lista() {
    this.router.navigate(['/listaAdmin'])
  }
  filtrar(ev:any){

    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.admins = this.admins.filter((item)=>{
        return(item.nome.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    
    }else {this.carregarAdmins();}

  }


}
