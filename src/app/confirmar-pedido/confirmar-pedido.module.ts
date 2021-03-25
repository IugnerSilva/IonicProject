import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfirmarPedidoPage } from './confirmar-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmarPedidoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConfirmarPedidoPage]
})
export class ConfirmarPedidoPageModule {}
