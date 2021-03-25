import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaAdminPage } from './lista-admin.page';
import { CadastroAdminPage } from '../cadastro-admin/cadastro-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ListaAdminPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaAdminPage,CadastroAdminPage],
  entryComponents:[CadastroAdminPage]
})
export class ListaAdminPageModule {}
