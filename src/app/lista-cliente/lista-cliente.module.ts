import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaClientePage } from './lista-cliente.page';
import { CadastroPage } from '../cadastro/cadastro.page';
import { DetalhesClientePage } from '../detalhes-cliente/detalhes-cliente.page';

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
  
  declarations: [ListaClientePage, CadastroPage,DetalhesClientePage],  
  entryComponents: [CadastroPage,DetalhesClientePage]
})
export class ListaClientePageModule {}
