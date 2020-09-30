import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriasPage } from './categorias.page'
import { DetalhesCatPage } from '../detalhes-cat/detalhes-cat.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoriasPage,DetalhesCatPage],
  entryComponents: [DetalhesCatPage]
})
export class CategoriasPageModule {}
