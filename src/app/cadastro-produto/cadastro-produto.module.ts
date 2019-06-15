import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastroProdutoPage } from './cadastro-produto.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroProdutoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastroProdutoPage]
})
export class CadastroProdutoPageModule {}
