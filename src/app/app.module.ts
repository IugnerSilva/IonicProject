import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavController, NavParams } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import {environment} from '../environments/environment';
import {AngularFireAuth} from '@angular/Fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { DBService } from './services/db.services';
import { LoginPage } from './login/login.page';
import { AuthService } from './services/auth.services';
import { HomePage } from './home/home.page';
import { DetalheHistoricoPage } from './detalhe-historico/detalhe-historico.page';
import { DetalheCliHistoricoPage } from './detalhe-cli-historico/detalhe-cli-historico.page';


@NgModule({
  declarations: [AppComponent,DetalheHistoricoPage,DetalheCliHistoricoPage],
  entryComponents: [DetalheHistoricoPage,DetalheCliHistoricoPage],
  imports: [

    BrowserModule, 
    IonicModule.forRoot(),AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebase),
      AppRoutingModule,
      AngularFireStorageModule,
     
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuth,
    AngularFireDatabase,
    DBService,
    NavController,
    AuthService,
    HomePage
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
