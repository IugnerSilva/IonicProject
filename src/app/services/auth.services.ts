import { Injectable, EventEmitter } from '@angular/core';

import { AngularFireAuth } from '@angular/Fire/auth';

import { Cliente } from '../model/cliente';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DBService } from './db.services';
import { Profile, Admin } from '../model/admin';
@Injectable()

export class AuthService {

  cliente:Cliente;
  usuarioId: string;
  uid:string;
  user: any;
  usuarioLogado = new EventEmitter<boolean>();

  constructor( private afa:AngularFireAuth,private router: Router,private toastCtrl: ToastController,
                private dbService: DBService) { 
      
    }
    async isAdmin() {
        return new Promise<boolean>((resolve, reject) => {
            this.afa.user
            .subscribe(async user => {
                const userFromDB = (await this.dbService.search<Admin>('admin', 'email', user.email))[0];
                const profileFromDB = await this.dbService.getObjectByKey<Profile>('perfis', userFromDB.profileUID);

                resolve(profileFromDB.isAdmin === true);
            });
        });
    }

fazerLogin(cliente : Cliente){
    try{
      this.afa.auth.signInWithEmailAndPassword(cliente.email,cliente.senha)
      this.router.navigate(['/home']);
      this.usuarioLogado.emit(true)
      
    } catch(error){
      
      this.usuarioLogado.emit(false);
      this.presentToast("Email ou Senha incorretos."+"\n"+"Por favor, tente novamente !");

    } 
  }

  criarUsuario(cliente : Cliente){
    return this.afa.auth.createUserWithEmailAndPassword(cliente.email,cliente.senha)
  }
 
  
  deslogar(){
    return this.afa.auth.signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
}
}