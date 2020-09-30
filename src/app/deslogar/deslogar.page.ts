import { Component, OnInit } from '@angular/core';
import { DBService } from '../services/db.services';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-deslogar',
  templateUrl: './deslogar.page.html',
  styleUrls: ['./deslogar.page.scss'],
})
export class DeslogarPage implements OnInit {
  
  carregando = true;
  
  loading: any;

  constructor(private auth: AuthService, private loadingCtrl: LoadingController, private router: Router ) {

    this.carregando = true;
    this.init();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor,aguarde...' });
    return this.loading.present();
  }

  private async init() {

    await this.presentLoading();

    try {

      this.auth.deslogar();
      this.carregando = false;
      
      
    } catch (error) {
      console.error(error);
      
    } finally {
      this.loading.dismiss();
    }
  }

  
    

  async ngOnInit() {

}
}