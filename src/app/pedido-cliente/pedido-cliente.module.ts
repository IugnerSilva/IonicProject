import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PedidoClientePage } from './pedido-cliente.page';
import { DetalhesCliPedidosPage } from '../detalhes-cli-pedidos/detalhes-cli-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: PedidoClientePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PedidoClientePage,DetalhesCliPedidosPage],
  
  entryComponents: [DetalhesCliPedidosPage]
})
export class PedidoClientePageModule {}
