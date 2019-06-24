import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DBService } from './services/db.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public pages = [{

    title: 'Início',
    url: '/home'
  }, {

    title: 'Lista de Clientes',
    url: '/listaCliente'

  },{

    title: 'Lista de Produtos',
    url: '/listaProdutos'

  }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private database: DBService,
    public router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 

  private async init() {


    try {

      this.database.deslogar();
      
    this.router.navigate(['/login'])
      
      
    } catch (error) {
      console.error(error);
      
    
    }
  }
}
