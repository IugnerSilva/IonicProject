import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListaClientePage } from './lista-cliente.page';
var routes = [
    {
        path: '',
        component: ListaClientePage
    }
];
var ListaClientePageModule = /** @class */ (function () {
    function ListaClientePageModule() {
    }
    ListaClientePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListaClientePage]
        })
    ], ListaClientePageModule);
    return ListaClientePageModule;
}());
export { ListaClientePageModule };
//# sourceMappingURL=lista-cliente.module.js.map