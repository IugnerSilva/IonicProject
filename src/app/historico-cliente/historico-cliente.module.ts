import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoricoClientePage } from './historico-cliente.page';
import { DetalheHistoricoPage } from '../detalhe-historico/detalhe-historico.page';
import { HistoricoDetalhesPage } from '../historico-detalhes/historico-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoClientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HistoricoClientePage,HistoricoDetalhesPage],
  entryComponents: [HistoricoDetalhesPage]
})
export class HistoricoClientePageModule {}
