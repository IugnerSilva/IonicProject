import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaClientePage } from './lista-cliente.page';
import { CadastroPage } from '../cadastro/cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: ListaClientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  
  declarations: [ListaClientePage, CadastroPage],  
  entryComponents: [CadastroPage]
})
export class ListaClientePageModule {}
