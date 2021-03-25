import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoricoDetalhesPage } from './historico-detalhes.page';
import { DetalheCliHistoricoPage } from '../detalhe-cli-historico/detalhe-cli-historico.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoDetalhesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoricoDetalhesPage,DetalheCliHistoricoPage],
  
  entryComponents: [DetalheCliHistoricoPage]
})
export class HistoricoDetalhesPageModule {}
