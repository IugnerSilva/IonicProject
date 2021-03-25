import { Injectable, EventEmitter } from '@angular/core';

import { AngularFireAuth } from '@angular/Fire/auth';

import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DBService } from './db.services';
import { Admin } from '../model/admin';
import { Perfil } from '../model/perfil';
@Injectable()

export class AuthService {

  cliente: Cliente;
  usuarioId: string;
  uid: string;
  user: any;
  usuarioLogado = new EventEmitter<boolean>();

  constructor(private afa: AngularFireAuth, private router: Router, private toastCtrl: ToastController,
    private dbService: DBService) {

  }
  async isAdmin() {

    return new Promise<boolean>((resolve, reject) => {
      this.afa.user
        .subscribe(async user => {
          if (user != null) {
            const userFromDB = (await this.dbService.search<Admin>('admin', 'email', user.email))[0];
            try {
              const profileFromDB = await this.dbService.getObjectByKey<Perfil>('perfis', userFromDB.perfilUID);

              resolve(profileFromDB.isAdmin === true);
            } catch {
              console.log('Usuário não é um Administrador !');
            };
          }
        }
        );
    });

  }

  fazerLogin(cliente: Cliente) {
    try {
      this.afa.auth.signInWithEmailAndPassword(cliente.email, cliente.senha)
      this.router.navigate(['/home']);
      this.usuarioLogado.emit(true)

    } catch (error) {

      this.usuarioLogado.emit(false);
      this.presentToast("Email ou Senha incorretos." + "\n" + "Por favor, tente novamente !");

    }
  }


  async excluirUsuarioLogado(cliente: Cliente, admin: Admin) {

    await this.afa.auth.signInWithEmailAndPassword(cliente.email, cliente.senha)

    var user = this.afa.auth.currentUser;
    user.delete();

    await this.afa.auth.signInWithEmailAndPassword(admin.email, admin.senha)
    this.router.navigate(['/listaCliente']);
  }

  criarUsuario(cliente: Cliente) {

    return this.afa.auth.createUserWithEmailAndPassword(cliente.email, cliente.senha)
      .then(res => {
        if (res.user) {
        }
      })
      .catch(err => {
        console.log(` Falha ao se cadastrar !`);

      });

  }


  async deslogar() {
    this.afa.auth.signOut();
    this.router.navigate(['/login'])
      .then(nav => {
        window.location.reload();
      })
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  
}