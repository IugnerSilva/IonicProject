import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoricoDetalhesPage } from './historico-detalhes.page';
import { DetalhesCliPedidosPage } from '../detalhes-cli-pedidos/detalhes-cli-pedidos.page';
import { DetalheHistoricoPage } from '../detalhe-historico/detalhe-historico.page';

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
  declarations: [DetalheHistoricoPage],
  
  entryComponents: [DetalheHistoricoPage]
})
export class HistoricoDetalhesPageModule {}
