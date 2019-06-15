import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ListaProdutosPage } from './lista-produtos.page';
var routes = [
    {
        path: '',
        component: ListaProdutosPage
    }
];
var ListaProdutosPageModule = /** @class */ (function () {
    function ListaProdutosPageModule() {
    }
    ListaProdutosPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ListaProdutosPage]
        })
    ], ListaProdutosPageModule);
    return ListaProdutosPageModule;
}());
export { ListaProdutosPageModule };
//# sourceMappingURL=lista-produtos.module.js.map