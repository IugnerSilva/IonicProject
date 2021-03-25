import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CadastroPage } from '../cadastro/cadastro.page';
import { Cliente } from '../model/cliente';
import { DBService } from '../services/db.services';
import { AngularFireAuth } from '@angular/Fire/auth';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil.page';

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.page.html',
  styleUrls: ['./perfil-cliente.page.scss'],
})
export class PerfilClientePage implements OnInit {

  clientes: Cliente[];
  carregando = true;
  loading: any;
  clienteLogado: any;


  constructor(public router: Router, private database: DBService, public modalController: ModalController,
    private loadingCtrl: LoadingController,private afa:AngularFireAuth, private toastCtrl: ToastController) {


  }

  async ngOnInit() {
    
    var user = this.afa.auth.currentUser;
    this.clienteLogado =user

    this.database.listar<Cliente>('/cliente')
    .then(clientes => {
      this.clientes = clientes;
      
    }).catch(error => {
        console.log(error);
      });
    
    this.carregando = true;

    await this.presentLoading();
    await this.carregarClientes();
  }

  private async carregarClientes() {
    this.database.listar<Cliente>('/cliente')
      .then(clientes => {
        this.clientes = clientes;
        this.carregando = false;
        this.loading.dismiss();
      }).catch(error => {
        console.log(error);
      });
  }

  remove(uid: string) {
    this.database.remover('/cliente', uid)
      .then(() => {
        this.presentToast('Cliente removido com sucesso!');
        this.carregarClientes();
      });
  
  }
  

  async editar(clientes: Cliente) {
    const modal = await this.modalController.create({
      component: EditarPerfilPage,
      componentProps: {
        editingCliente: clientes
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
      component: CadastroPage
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
    this.carregarClientes();
    this.lista();
  }

  
  lista() {
    this.router.navigate(['/listaCliente'])
  }
  filtrar(ev:any){

    const val = ev.target.value;
    if(val && val.trim() != ''){
      this.clientes = this.clientes.filter((item)=>{
        return(item.nome.toLowerCase().indexOf(val.toLowerCase())>-1);
      })
    
    }else {this.carregarClientes();}

  }  

}
