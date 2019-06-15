import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MenuPage } from './menu.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [

      { path: 'cereais', loadChildren: '../cereais/cereais.module#CereaisPageModule', canActivate: [AuthGuard] },
      { path: 'limpeza', loadChildren: '../limpeza/limpeza.module#LimpezaPageModule', canActivate: [AuthGuard] },

      { path: 'listaCliente',
                   loadChildren: '../lista-cliente/lista-cliente.module#ListaClientePageModule', canActivate: [AuthGuard] },

     
      { path: 'deslogar', loadChildren: '../deslogar/deslogar.module#DeslogarPageModule',canActivate: [AuthGuard] },
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      
  { path: 'cereais', loadChildren: '../cereais/cereais.module#CereaisPageModule', /*canActivate: [AuthGuard]*/ },
    
  ]
  }, { 
    
    path: ' ',
    redirectTo: '/menu/home'
   
   }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
