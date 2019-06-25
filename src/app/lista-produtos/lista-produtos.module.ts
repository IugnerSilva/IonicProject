import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListaProdutosPage } from './lista-produtos.page';
import { CadastroProdutoPage } from '../cadastro-produto/cadastro-produto.page';

const routes: Routes = [
  {
    path: '',
    component: ListaProdutosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListaProdutosPage, CadastroProdutoPage],  
  entryComponents: [CadastroProdutoPage]
})
export class ListaProdutosPageModule {}
