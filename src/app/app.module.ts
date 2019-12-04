import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
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
import { CartModalPageModule } from './cart-modal/cart-modal.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [

    BrowserModule, 
    IonicModule.forRoot(),AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebase),
      AppRoutingModule,
      AngularFireStorageModule,
      CartModalPageModule
     
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AngularFireAuth,
    AngularFireDatabase,
    DBService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
