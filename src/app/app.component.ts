import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DBService } from './services/db.services';
import { Router } from '@angular/router';
import { LoginPage } from './login/login.page';
import { AuthService } from './services/auth.services';
import { HomePage } from './home/home.page';
import { AngularFireAuth } from '@angular/Fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  
  
  public pages = [{
    
    title: 'Início',
    url: '/home',
    icon: 'home'
  },{

    title: 'Cadastrar Administrador',
    url: '/cadastro-admin',
    icon: 'basket'

  },{

    title: 'Categorias',
    url: '/categorias',
    icon: 'ios-list'

  }, {

    title: 'Histórico de pedidos',
    url: '/historico-cliente',
    icon: 'ios-list-box'

  },{
    title: 'Lista de Administradores',
    url: '/lista-admin',
    icon: 'contacts'
    
  },{

    title: 'Lista de Clientes',
    url: '/listaCliente',
    icon: 'contacts'

  },{

    title: 'Lista de Produtos',
    url: '/listaProdutos',
    icon: 'basket'

  },{

    title: 'Cadastro de Perfis',
    url: '/cadastro-perfil',
    icon: 'basket'

  },{

    title: 'Pedidos',
    url: '/pedidos',
    icon: 'ios-mail'

  }
  ];

  public pages2 = [{
    
    title: 'Início',
    url: '/home',
    icon: 'home'
  },{

    title: 'Categorias',
    url: '/categorias',
    icon: 'ios-list'

  },{

    title: 'Pedidos',
    url: '/pedidos',
    icon: 'ios-mail'

  }
  ];
  
  mostrarMenu: boolean = false ;
  administrador: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private database: DBService,
    public router: Router,
    private auth: AuthService,
    private afa:AngularFireAuth
    
  ) {

    
  }
  
  async inicializarDadosLogin() {
    var user = this.afa.auth.currentUser;
    if(user != null){
    this.administrador = await this.auth.isAdmin();
    console.log('administrador'+this.administrador)
    }
  }


  async ngOnInit(){
    this.initializeApp(); 
    this.inicializarDadosLogin();

      this.auth.usuarioLogado.subscribe(
        mostrar=>this.mostrarMenu = mostrar
      );
      console.log(this.mostrarMenu)
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
 

  async sair() {
this.afa.auth.signOut();
this.router.navigate(['/login'])
.then(nav => {
      window.location.reload();
})
      
    
  }
}
