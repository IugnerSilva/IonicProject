import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PedidosPage } from './pedidos.page';
import { DetalhesPedidosPage } from '../detalhes-pedidos/detalhes-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidosPage,DetalhesPedidosPage],
  entryComponents: [DetalhesPedidosPage]
})
export class PedidosPageModule {}
