import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PerfilClientePage } from './perfil-cliente.page';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilClientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PerfilClientePage,EditarPerfilPage],
  entryComponents:[EditarPerfilPage]
})
export class PerfilClientePageModule {}
