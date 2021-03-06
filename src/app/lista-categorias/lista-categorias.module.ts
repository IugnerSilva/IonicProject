import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaCategoriasPage } from './lista-categorias.page';
import { CadastroCategoriaPage } from '../cadastro-categoria/cadastro-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: ListaCategoriasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaCategoriasPage,CadastroCategoriaPage],
  entryComponents: [CadastroCategoriaPage]
})
export class ListaCategoriasPageModule {}
