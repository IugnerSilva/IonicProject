import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { DBService } from '../services/db.services';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CadastroPage } from '../cadastro/cadastro.page';
import { AngularFireAuth } from '@angular/Fire/auth';
import { DetalhesClientePage } from '../detalhes-cliente/detalhes-cliente.page';
import { AuthService } from '../services/auth.services';
import { Admin } from '../model/admin';

@Component({
  selector: 'app-lista-cliente',
  templateUrl: './lista-cliente.page.html',
  styleUrls: ['./lista-cliente.page.scss'],
  
  providers: [DBService]
})
export class ListaClientePage implements OnInit {

  clientes: Cliente[];
  carregando = true;
  loading: any;
  cliente: Cliente;
  admins: Admin[];
  usuario: Admin;

  constructor(public router: Router, private database: DBService, public modalController: ModalController,
    private loadingCtrl: LoadingController, private auth:AuthService,private afa:AngularFireAuth, private toastCtrl: ToastController) {


  }

  async ngOnInit() {

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

 remove(clientes: Cliente, uid: string) {
    this.database.remover('/cliente', uid)
      .then(() => {
        this.presentToast('Cliente removido com sucesso!');
        this.carregarClientes();
      });

      var user= this.afa.auth.currentUser;

      this.database.listar<Admin>('/admin')
      .then(admins => {
        this.admins = admins;
        for(let admin of this.admins){
          if(user.email == admin.email){

            this.usuario = admin
            this.auth.excluirUsuarioLogado(clientes,this.usuario);
          }
        }
      }).catch(error => {
          console.log(error);
        });   
  }
  

  async editar(clientes: Cliente) {
    const modal = await this.modalController.create({
      component: CadastroPage,
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

  async detalhes(cliente: Cliente) {
    const modal = await this.modalController.create({
      component: DetalhesClientePage,
      componentProps: {
        editingCli: cliente
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {

        }
      });

    return  await modal.present();
  }
  

}
